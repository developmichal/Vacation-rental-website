import React, { useEffect, useState } from "react";
import "./PersonalArea.css";
import { getApartmentByIdAdvertiser, remove } from "../api";
import { NavLink, useNavigate, useParams } from "react-router";
import Card from "./card";

export const PersonalArea = () => {
    const params = useParams();
    const [list, setList] = useState([]); // סטייט של רשימת הדירות
    const navigate = useNavigate();
    const id1 = params.id;

    // קריאה ל-API כדי לקבל את רשימת הדירות
    const fetchApartments = () => {
        getApartmentByIdAdvertiser(id1)
            .then((response) => setList(response.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchApartments();
    }, [id1]);

    // פונקציה למחיקת דירה
    const handleDelete = async (id) => {
        try {
            console.log("Deleting apartment with ID:", id, "and advertiser ID:", id1);
            const response = await remove(id); // קריאה למחיקה
            console.log("Response from server:", response);

            // קריאה מחדש כדי לעדכן את הרשימה אחרי מחיקה
            fetchApartments();
        } catch (err) {
            console.error("Error deleting apartment:", err);
        }
    };
    
    // פונקציה לעריכת דירה
    const handleEdit = (id) => {
        navigate(`/editApartment/${id}/${id1}`);
    };

    const returnHome = () => {
        navigate("/Home");
    };
    const add=()=>{
        navigate(`/Add/${id1}`)  
    }

    return (
        <div className="app">
            <header className="header">
                <div className="logo">
                    <NavLink to="/home" className="logo">
                        <img src={`${process.env.PUBLIC_URL}/img/1.png`} id="logo" alt="Logo" />
                    </NavLink>
                </div>
                <nav className="nav-bar">
                    <button className="nav-button" onClick={add}>להוספת דירה</button>
                    <button className="nav-button" onClick={returnHome}>
                        חזרה לדף הבית
                    </button>
                </nav>
            </header>

            <div>
                <h1>דירות להשכרה</h1>
                <div className="cards-container">
                    {list.map((apartment, index) => (
                        <div key={index} className="card-wrapper">
                            {/* האייקונים מוצגים כאן מעל כל כרטיס */}
                            <div className="icons">
                                <button
                                    className="icon-button delete-button"
                                    onClick={() => handleDelete(apartment._id)}
                                >
                                    🗑️
                                </button>
                                <button
                                    className="icon-button edit-button"
                                    onClick={() => handleEdit(apartment._id)}
                                >
                                    ✏️
                                </button>
                            </div>
                            {/* הכרטיס עצמו */}
                            <Card
                                id={apartment._id}
                                title={apartment.nameApartment}
                                description={apartment.description}
                                images={apartment.image || []}
                                price={apartment.price}
                                numBeds={apartment.numBeds}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PersonalArea;
