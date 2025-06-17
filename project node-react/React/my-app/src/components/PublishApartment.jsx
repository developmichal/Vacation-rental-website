import './PublishApartment.css';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addApartment, getCategory, getCity } from "../api";

export const PublishApartment = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [newApartment, setNewApartment] = useState({ nameApartment: "", description: "", price: "", beds: "", address: "", category: "", city: "" });
    const [images, setImages] = useState([]); // לאחסון התמונות

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryData = await getCategory();
                const cityData = await getCity();

                console.log('Categories Data:', categoryData); // בדוק את הנתונים שמגיעים
                console.log('Cities Data:', cityData); // בדוק את הערים שמגיעות

                // עדכן את הסטייט עם הנתונים
                setCategories(categoryData?.data || []);
                setCities(cityData?.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewApartment((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (e, type) => {
        const value = e.target.value;
        setNewApartment((prevState) => ({ ...prevState, [type]: value }));
    };


    const handleImageChange = (e) => {
        // המרת FileList למערך של קבצים
        const files = Array.from(e.target.files);
        setImages(files);  // עדכון המשתנה images עם המערך החדש
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newApart = {
            "nameApartment": newApartment.name,
            "address": newApartment.address,
            "city": e.target[6].value,
            "price": newApartment.price,
            "description": newApartment.description,
            "category": e.target[5].value,
            "image": images,
            "numBeds": newApartment.beds,
            "advertiser": id,
        }
        console.log(newApart);


        try {
            await addApartment(newApart, id);
            alert("הדירה נוספה בהצלחה!");
            navigate("/home");
        } catch (error) {
            alert("שגיאה בהוספת הדירה. אנא התחבר קודם.");
            // navigate("/login");
        }
    };

    return (
        <div className="create-apartment-page">
            <form onSubmit={handleSubmit} className="create-apartment-form" encType="multipart/form-data">
                <div className="form-image"></div>
                <h2>הוסף דירה</h2>
                <div>
                    <label>שם הדירה</label>
                    <input type="text" name="name" value={newApartment.name} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>תיאור</label>
                    <textarea name="description" value={newApartment.description} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>מחיר</label>
                    <input type="number" name="price" value={newApartment.price} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>כתובת</label>
                    <input type="text" name="address" value={newApartment.address} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>מספר מיטות</label>
                    <input type="number" name="beds" value={newApartment.beds} onChange={handleInputChange} required />
                </div>

                <div>
                    <label>קטגוריה</label>
                    <select name="category" value={newApartment.category} onChange={(e) => handleSelectChange(e, 'category')} required>
                        <option value="" disabled hidden>בחר קטגוריה</option>
                        {Array.isArray(categories) && categories.length > 0 ? (
                            categories.map((category, index) => (
                                <option key={category.id || index} value={category._id}>{category.nameCategory}</option>
                            ))
                        ) : (
                            <option disabled>אין קטגוריות זמינות</option>
                        )}
                    </select>
                </div>

                <div>
                    <label>עיר</label>
                    <select name="city" value={newApartment.city} onChange={(e) => handleSelectChange(e, 'city')} required>
                        <option value="" disabled hidden>בחר עיר</option>
                        {Array.isArray(cities) && cities.length > 0 ? (
                            cities.map((city, index) => (
                                <option key={city.id || index} value={city._id}>{city.nameCity}</option>
                            ))
                        ) : (
                            <option disabled>אין ערים זמינות</option>
                        )}
                    </select>
                </div>

                <div>
                    <label>העלאת תמונות</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>


                <button type="submit" className='bt1'>פרסם דירה</button>
            </form>
        </div>
    );
};

export default PublishApartment;
