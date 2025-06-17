import React, { useState } from "react";
import "./sign.css";
import { register } from "../api";
import swal from "sweetalert";
import { useNavigate } from "react-router";

export const Sign = () => {
    const navigate = useNavigate();
    const send = async (event) => {
        event.preventDefault();
        // שליפת הנתונים מהטופס
        const email = event.target[0].value;
        const password = event.target[1].value;
        const phone1 = event.target[2].value;
        const phone2 = event.target[3].value;
        const user = { email, password, phone1, phone2 };

        try {
            // שליחה לשרת באמצעות POST
            const response = await register(user)  // בדוק אם זו הכתובת הנכונה

            // אם הכל תקין
            if (response) {
                swal(`Hello ${response.data.advertiser.email}`, 'Sign up successfully!', 'success');
                sessionStorage.setItem("token", response.data.token);
                sessionStorage.setItem("advertiser", JSON.stringify(response.data.advertiser));
                navigate('../Home');
            }
        } catch (error) {
            // שליחה של הודעת שגיאה למשתמש
            if (error.response) {
                // אם יש תשובה מהשרת
                alert(`Error: ${error.response.data.error}`);
            } else {
                // אם אין תשובה מהשרת (למשל אם יש בעיית חיבור)
                alert('Something went wrong, please try again later.');
            }
        }
    };

    return (
        <div className="background">
            <div className="overlay">
                <div className="wrapper">
                    <h1>הרשמה</h1>
                    <form onSubmit={send}>
                        <div className="input-box">
                            <input type="email" placeholder="אימייל" required />
                            <i className="bx bxs-user"></i>
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="סיסמה" required />
                            <i className="bx bxs-lock-alt"></i>
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="טלפון 1" required />
                            <i className="bx bxs-lock-alt"></i>
                        </div>
                        <div className="input-box">
                            <input type="text" placeholder="טלפון 2" />
                            <i className="bx bxs-lock-alt"></i>
                        </div>
                        <button type="submit" className="btn">הרשמה</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign;
