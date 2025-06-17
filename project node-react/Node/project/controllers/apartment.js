import Apartment from "../models/apartment.js";
import City from "../models/city.js";
import Category from "../models/category.js"; // ודא שאתה מייבא את קטגוריה
import Advertiser from "../models/advertiser.js";

// שליפת כל הדירות
export const getAllApartment = async (req, res) => {
    try {
        const apartments = await Apartment.find()
            .populate("category", "nameCategory")
            .populate("city", "nameCity")
            .populate("advertiser", "email phone1");

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// הוספת דירה
export const addApartment = async (req, res) => {
    const { nameApartment, address, city, price, description, category, image, numBeds, advertiser } = req.body;

    try {
        const newApartment = new Apartment({
            nameApartment,
            address,
            city,
            price,
            description,
            category,
            image,
            numBeds,
            advertiser
        });

        const savedApartment = await newApartment.save();

        // עדכון הקטגוריה, העיר והמשווק
        await Category.findByIdAndUpdate(category, { $push: { arrApartment: savedApartment._id } });
        await City.findByIdAndUpdate(city, { $push: { arrApartment: savedApartment._id } });
        await Advertiser.findByIdAndUpdate(advertiser, { $push: { arrApartment: savedApartment._id } });

        res.status(201).send(`message: create apartment ${savedApartment._id} succeed!`);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}; 

//עידכון דירה לפי קוד
export const updateApartment = async (req, res) => {
    console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");

    const { id, id1 } = req.params;
    console.log('Received update request for apartment:', id, 'by advertiser:', id1);  // הדפסת מזהים
    console.log('Received data:', req.body);  // הדפסת הנתונים שהתקבלו

    const nowAdvertiser = await Advertiser.findById(id1);
    if (!nowAdvertiser)
        return res.status(404).send({ message: 'Advertiser not found' });

    console.log("Advertiser's apartments:", nowAdvertiser.arrApartment);  // הדפסת מערך הדירות
    if (!nowAdvertiser.arrApartment.includes(id)) {
        return res.status(404).send({ message: 'The apartment does not belong to the advertiser' });
    }

    try {
        const apartment = await Apartment.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).send({ message: `Update apartment ${apartment._id} succeeded!` });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


//מחיקה
export const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const apartment = await Apartment.findByIdAndDelete(id);
        if (!apartment) {
            return res.status(404).send({ error: 'Apartment not found' });
        }
        await Category.findByIdAndUpdate(apartment.category, { $pull: { arrApartment: apartment._id } });
        await City.findByIdAndUpdate(apartment.city, { $pull: { arrApartment: apartment._id } });
        await Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { arrApartment: apartment._id } });
        res.status(200).send({ message: `Delete apartment ${apartment._id} succeed!` });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

//שליפת דירה לפי קוד
export const getById = async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id)
            .populate("category", "nameCategory")
            .populate("city", "nameCity")
            .populate("advertiser", "email phone1");

        if (!apartment) {
            return res.status(404).send({ error: `apartment not found!` });
        }

        res.status(200).send({ apartment });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// פונקציה לשליפת עיר לפי ID
// export const getApartmentByIdCity = async (req, res) => {
//     try {
//         const apartments = await Apartment.find({ city: req.params.id })           
//          .populate("category", "nameCategory")
//             .populate("city", "nameCity")
//             .populate("advertiser", "email phone1");

//         if (!apartments) {
//             return res.status(404).send({ message: "Apartment not found!" });
//         }

//         res.status(200).send(apartments);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
// //שליפה לפי קוד מפרסם
export const getApartmentsByAdvertiser = async (req, res) => {
    const { advertiserId } = req.params;

    try {
        const apartments = await Apartment.find({ advertiser: advertiserId })
            .populate("category", "nameCategory")
            .populate("city", "nameCity")
            .populate("advertiser", "email phone1");

        if (apartments.length === 0) {
            return res.status(404).json({ message: "No apartments found for this advertiser!" });
        }

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getApartmentsByCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const apartments = await Apartment.find({ category: id })
            .populate("category", "nameCategory")
            .populate("city", "nameCity")
            .populate("advertiser", "email phone1");

        if (apartments.length === 0) {
            return res.status(404).json({ message: "No apartments found for this category!" });
        }

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// שליפת דירות לפי כמות מיטות  
export const getByNumBeds = async (req, res) => {
    const { beds } = req.params;
    try {
        const apartments = await Apartment.find(({ beds: { $gte: Number(beds) } }))
            .populate("category", "nameCategory")
            .populate("city", "nameCity")
            .populate("advertiser", "email phone1");

        if (apartments.length === 0) {
            return res.status(404).json({ message: "No apartments found with the specified number of beds!" });
        }

        res.status(200).json(apartments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//	שליפת דירות לפי מחיר 
export const getByPrice = (req, res) => {
    const price = req.params.price
    Apartment.find()
        //$lte - קטן מ
        .where({ price: { $lte: Number(price) } })
        .then(apartment => {
            res.status(200).send({ apartment })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })
}
export const getFilteredApartments = async (req, res) => {
    
    try {
        const { city, category, numBeds} = req.body; // מקבל את הפרמטרים מגוף הבקשה

        console.log(req.body); // הדפסת הערכים שמתקבלים

        // יצירת אובייקט תנאים לפילטור, רק אם הערכים לא null או undefined
        const filterConditions = {};

        // אם התקבלה עיר, נבצע חיפוש לפי ה-ObjectId שלה
        if (city) {
            // const city = await City.findOne({ codeCity: CodeCity }); // חיפוש עיר לפי קוד העיר
            // if (!city) {
            //     return res.status(404).json({ message: 'City not found',CodeCity });
            // }
            filterConditions.city = city;  // נשתמש ב-ObjectId של העיר
            // return res.status(404).json({ message: 'City not found',filterConditions });
}

        // אם התקבלה קטגוריה, נבצע חיפוש לפי ה-ObjectId שלה
        if (category) {
            // const category = await Category.findOne({ codeCategory: CodeCategory }); // חיפוש קטגוריה לפי קוד קטגוריה
            // if (!category) {
            //     return res.status(404).json({ message: 'Category not found' });
            // }
            filterConditions.category = category;  // נשתמש ב-ObjectId של הקטגוריה
        }

        // אם התקבל מספר מיטות גדול מ-0, נוסיף תנאי לפילטר
        if (numBeds > 0) {  // אם מספר מיטות גדול מ-0
            filterConditions.numBeds = { $gte: numBeds }; // אם
        }
       

        // הדפסת תנאי השאילתה שנוצרים
        console.log('Filter conditions:', filterConditions);

        // שאילתה עם תנאים דינמיים
        // const apartments = await Apartment.find(filterConditions)
        //     .populate('city', 'nameCity') // יPopulate את שם העיר
        //     .populate('category', 'nameCategory') // יPopulate את שם הקטגוריה
        //     .exec();

        // אם אין תוצאות
        // if (apartments.length === 0) {
        //     return res.status(404).json({ message: 'No apartments found matching the criteria.' });
        // }

        // החזרת התוצאות
        // res.status(200).json(apartments);
        const apartments = await Apartment.find(filterConditions);
//     } catch (err) {
//         console.error('Error fetching apartments:', err);
//         res.status(500).json({ error: 'Server error' });
//     }
// };
  // אם אין תוצאות
  if (apartments.length === 0) {
    res.status(404).json({ message: 'No apartments found matching the criteria.' });
}

// החזרת התוצאות
res.status(200).json(apartments);
} catch (err) {
console.error('Error fetching apartments:', err);
res.status(500).json({ error: 'Server error' });
}
}; 