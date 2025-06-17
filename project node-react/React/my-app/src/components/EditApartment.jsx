import React, { useRef, useState } from 'react';
import './PersonalArea.css';
import swal from 'sweetalert';
import { useParams, useNavigate } from 'react-router';
import { update } from '../api';

export const EditApartment = () => {
    const params = useParams();
    const navigate = useNavigate(); // לשימוש בניווט חזרה לדף הקודם
    const id = params.id; // מזהה הדירה
    const userId = params.id1; // מזהה המשתמש
    const price = useRef();
    const beds = useRef();
    const nameApart = useRef();
    const description = useRef();

    const [change, setChange] = useState(false); // כדי לדעת אם היו שינויים בטופס
    const [isOpen, setIsOpen] = useState(true); // סטייט לניהול פתיחה/סגירה של המודאל

    // פונקציה לסגירת המודאל וניווט אחורה
    const closeModal = () => {
        setIsOpen(false); // סוגר את המודאל
        navigate(-1); // חזרה לדף הקודם
    };

    // פונקציה לשליחת הנתונים לשרת
    const send = async () => {
        const apartmentData = {};

        // בדיקת שדות שהשתנו
        if (price.current.value) apartmentData.price = price.current.value;
        if (beds.current.value) apartmentData.numBeds = beds.current.value;
        if (nameApart.current.value) apartmentData.nameApartment = nameApart.current.value;
        if (description.current.value) apartmentData.description = description.current.value;

        // אם אין שינויים, הצגת הודעה למשתמש
        if (Object.keys(apartmentData).length === 0) {
            swal({
                title: 'לא בוצעו שינויים',
                text: 'לא הוזן מידע לעדכון',
                icon: 'warning',
                button: 'אוקי',
            });
            return;
        }

        console.log('Sending data:', apartmentData); // הדפסת הנתונים הנשלחים

        try {
            // שליחת בקשה לשרת
            const response = await update(id, userId, apartmentData);

            console.log('Apartment updated successfully:', response.data);

            // הצגת הודעת הצלחה למשתמש
            swal({
                title: `השינויים עודכנו בהצלחה!`,
                text: 'תודה שהשתמשתם בשירותינו 👍',
                icon: 'success',
                button: 'אוקי',
            }).then(() => {
                closeModal(); // סגירת המודאל לאחר העדכון
            });
        } catch (err) {
            console.error('Error updating apartment:', err);
            swal({
                title: `שגיאה בעדכון הדירה`,
                text: 'הייתה בעיה בעדכון הדירה, נסה שוב מאוחר יותר.',
                icon: 'error',
                button: 'אוקי',
            });
        }
    };

    // עדכון הסטטוס של השינויים
    const set = () => {
        setChange(true);
    };

    // אם המודאל סגור, לא מציגים את הקומפוננטה
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal}>×</button> {/* כפתור סגירה */}
                <div className="modal-body">
                    <div className="input-box2">
                        <input
                            type="text"
                            placeholder="שינוי מחיר"
                            onBlur={set}
                            ref={price}
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box2">
                        <input
                            type="text"
                            placeholder="שינוי כמות מיטות"
                            onBlur={set}
                            ref={beds}
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box2">
                        <input
                            type="text"
                            placeholder="שינוי שם דירה"
                            onBlur={set}
                            ref={nameApart}
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box2">
                        <input
                            type="text"
                            placeholder="שינוי תיאור בית"
                            onBlur={set}
                            ref={description}
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <button
                        type="submit"
                        className="btn1"
                        disabled={!change} // הכפתור פעיל רק אם יש שינוי
                        onClick={send}
                    >
                        עדכן
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditApartment;
