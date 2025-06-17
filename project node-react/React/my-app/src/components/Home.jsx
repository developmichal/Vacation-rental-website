// import React, { useEffect, useRef, useState } from "react";
// import './style.css';
// import Carousel from "./Carousel";
// import { Nav } from "./Nav"; // ייבוא קומפוננטת Nav
// import { getCity } from "../api";
// import { useNavigate } from "react-router";
// import { AllCard } from "./allCard";

// export const Home = () => {
//     const [selectedCategory, setSelectedCategory] = useState("בחר קטגוריה");
//     const [SelectedCity, setSelectedCity] = useState(" בחר עיר");
//     const [SelectedBeds, setSelectedBeds] = useState(" בחר כמות מיטות");

//     const [idCategory, setIdCategory] = useState(null);
//     const [idCity, setIdCity] = useState(null);
//     const [idBeds, setIdBeds] = useState(null);

//     const [list, setList] = useState([]);
//     const navigate = useNavigate();


//     useEffect(() => {
//         getCity()
//             .then(x => setList(x.data))
//             .catch(err => console.log(err));
//     }, []);
//     useEffect(() => {
//     }, [list]);

//     const componentCRef = useRef(null);  // יצירת ref ל-ComponentC

//     const scrollToComponentC = () => {
//         componentCRef.current.scrollIntoView({ behavior: 'smooth' });
//     };
//     const handleCategorySelect = (category, id) => {
//         setSelectedCategory(category);
//         setIdCategory(id);
//     };
//     const handleCitySelect = (city, id) => {
//         setSelectedCity(city);
//         setIdCity(id);
//     };
//     const handleBedsSelect = (beds) => {
//         setIdBeds(beds);
//         setSelectedBeds(beds);
//     };
//     const Search = () => {
//         navigate(`/Search/${idCategory}/${idCity}/${idBeds}`);
//     };
//     const categories = JSON.parse(localStorage.getItem("categories")) || [];
//     const cities = JSON.parse(localStorage.getItem("cities")) || [];

//     return (
//         <>
//             {/* הפניית ה-ref והפונקציה לקומפוננטת Nav */}
//             <Nav scrollToComponentC={scrollToComponentC} />

//             <div className="div">
//                 <div className="search-filter-container">
//                     <div className="search-filter">
//                         {/* Dropdown עבור קטגוריה */}
//                         <div className="custom-dropdown">
//                             <div className="dropdown-btn">{selectedCategory}</div>
//                             <ul className="dropdown-content">
//                                 {categories.map((item, index) => (
//                                     <li key={index} onClick={() => handleCategorySelect(item.nameCategory, item._id)}>
//                                         {item.nameCategory}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div className="custom-dropdown">
//                             <div className="dropdown-btn">{SelectedCity}</div>
//                             <ul className="dropdown-content">
//                                 {cities.map((item, index) => (
//                                     <li key={index} onClick={() => handleCitySelect(item.nameCity, item._id)}>
//                                         {item.nameCity}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                         <div className="custom-dropdown">
//                             <div className="dropdown-btn">{SelectedBeds}</div>
//                             <ul className="dropdown-content">
//                                 {Array.from({ length: 200 }, (_, index) => (
//                                     <li key={index} onClick={() => handleBedsSelect(index + 1)}>
//                                         {index + 1} {/* כאן תציג את המספר */}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <button className="button1" onClick={Search}>לחץ כאן</button>
//                     </div>
//                 </div>
//             </div>

//             <div className="blue-background"></div>

//             {/* מעביר את ה-ref ל-Carousel */}
//             <Carousel ref={componentCRef} />
//             <AllCard/>
//         </>
//     );
// };
// import React, { useEffect, useRef, useState } from "react";
// import './style.css';
// import Carousel from "./Carousel";
// import { Nav } from "./Nav"; // ייבוא קומפוננטת Nav
// import { getCity } from "../api";
// import { useNavigate } from "react-router";
// import { AllCard } from "./allCard";
import React, { useEffect, useRef, useState } from "react";
import './style.css';
import Carousel from "./Carousel.jsx";
import { Nav } from "./Nav"; // ייבוא קומפוננטת Nav
import { getCity, getCategory } from "../api.js"; // הוספתי את getCategories
import { useNavigate } from "react-router";
import { AllCard } from "./allCard";

export const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("בחר קטגוריה");
    const [selectedCity, setSelectedCity] = useState("בחר עיר");
    const [selectedBeds, setSelectedBeds] = useState("בחר כמות מיטות");

    const [idCategory, setIdCategory] = useState(null);
    const [idCity, setIdCity] = useState(null);
    const [idBeds, setIdBeds] = useState(null);

    const [categories, setCategories] = useState([]); // סטייט חדש לשמירת קטגוריות
    const [cities, setCities] = useState([]); // סטייט חדש לשמירת ערים

    const navigate = useNavigate();
    const componentCRef = useRef(null); // יצירת ref ל-ComponentC

    useEffect(() => {
        // Fetch ערים וקטגוריות
        getCity()
            .then(x => setCities(x.data))
            .catch(err => console.log(err));

            getCategory()
            .then(x => setCategories(x.data))
            .catch(err => console.log(err));
    }, []); // להפעיל רק פעם אחת בעת טעינת הדף

    const scrollToComponentC = () => {
        componentCRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCategorySelect = (category, id) => {
        setSelectedCategory(category);
        setIdCategory(id);
    };

    const handleCitySelect = (city, id) => {
        setSelectedCity(city);
        setIdCity(id);
    };

    const handleBedsSelect = (beds) => {
        setIdBeds(beds);
        setSelectedBeds(beds);
    };

    const Search = () => {
        const searchParams = {
            city: idCity || null, // קוד העיר או null אם לא קיים
           category: idCategory || null, // מספר מיטות (ערך ברירת מחדל 0)
              numBeds: idBeds || 0// קטגוריה או null אם לא נבחרה
        };

        console.log(searchParams); // הדפסת האובייקט
        navigate('/search', { state: searchParams }); // שליחת פרמטרים לדף החיפוש
    };

    return (
        <>
            <Nav scrollToComponentC={scrollToComponentC} />
            <div className="div">
                <div className="search-filter-container">
                    <div className="search-filter">
                        {/* Dropdown עבור קטגוריה */}
                        <div className="custom-dropdown">
                            <div className="dropdown-btn">{selectedCategory}</div>
                            <ul className="dropdown-content">
                                {categories.map((item, index) => (
                                    <li key={index} onClick={() => handleCategorySelect(item.nameCategory, item._id)}>
                                        {item.nameCategory}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Dropdown עבור עיר */}
                        <div className="custom-dropdown">
                            <div className="dropdown-btn">{selectedCity}</div>
                            <ul className="dropdown-content">
                                {cities.map((item, index) => (
                                    <li key={index} onClick={() => handleCitySelect(item.nameCity, item._id)}>
                                        {item.nameCity}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Dropdown עבור מיטות */}
                        <div className="custom-dropdown">
                            <div className="dropdown-btn">{selectedBeds}</div>
                            <ul className="dropdown-content">
                                {Array.from({ length: 200 }, (_, index) => (
                                    <li key={index} onClick={() => handleBedsSelect(index + 1)}>
                                        {index + 1}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="button1" onClick={Search}>לחץ כאן</button>
                    </div>
                </div>
            </div>

            <div className="blue-background"></div>
            <Carousel ref={componentCRef} />
            <AllCard />
        </>
    );
};

