import React, { useState } from "react";
import "./sign.css";
import { login } from "../api";
import { useNavigate } from "react-router";
import swal from "sweetalert";


export const Login = () => {
    const navigate = useNavigate();
    const send = async (event) => {
        event.preventDefault();

        // שליפת הנתונים מהטופס
        const email = event.target[0].value;
        const password = event.target[1].value;
        const user = { email, password };
        console.log(user)

        try {
            // שליחה לשרת באמצעות POST
            const response = await login(user)  // בדוק אם זו הכתובת הנכונה
            console.log(response)
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
                    <button type="submit" className="btn">הרשמה</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
