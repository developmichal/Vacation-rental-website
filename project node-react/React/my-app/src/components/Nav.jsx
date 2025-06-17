import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // וודא שהייבוא הזה קיים
import './Nav.css';

export const Nav = ({ scrollToComponentC }) => {
    const navigate = useNavigate();

    const check = () => {
        const token = sessionStorage.getItem("token"); // בדוק אם יש טוקן
        if (token) {
            // אם יש טוקן, גש לאזור האישי
            const advertiser = JSON.parse(sessionStorage.getItem("advertiser"));
            if (advertiser && advertiser._id) {
                const path = `/PersonalArea/${advertiser._id}`;
                navigate(path); // ניווט לאזור האישי
            }
        } else {
            // אם אין טוקן, העבר לדף ההתחברות
            navigate('/login'); // ניווט לדף ההתחברות
        }
    };

    return (
        <div className='allDiv'>
            <div className="divlogo">
                <NavLink to="/home" className="logo">
                    <img src={`${process.env.PUBLIC_URL}/img/1.png`} id="logo" alt="Logo" />
                </NavLink>
            </div>
            <div className="nav">
                <NavLink to='/Home' id='v1'>
                    <button className='button'>כל הבתים</button>
                </NavLink>
                <NavLink to='#categorySection' id='v1'>
                    <button className='button' onClick={scrollToComponentC}>הצגת הקטגוריות</button>
                </NavLink>
                <button
                    className='button'
                    onClick={check} // הקריאה לפונקציית הניווט
                >
                    לאזור האישי
                </button>
                <NavLink to='/login'>
                    <button className='button' id='sign'>התחברות</button>
                </NavLink>
            </div>
        </div>
    );
};
