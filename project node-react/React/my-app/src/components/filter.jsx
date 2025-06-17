import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFilteredApartments } from '../api.js'
import Card from './card.jsx';
export const Filter = () => {
    const location = useLocation();
    const [list, setList] = useState([]); // שמירת רשימת הדירות
    const [params, setParams] = useState(() => {
        const savedParams = localStorage.getItem('searchParams');
        return savedParams ? JSON.parse(savedParams) : { CodeCity: '', NumBed: 0, Price: 0 }; // ברירת מחדל
    });
console.log(params);

    // מעקב אחרי שינויים ב-location.state
    useEffect(() => {
        console.log('location.state:', location.state); // לראות את הערכים שמתקבלים מ-location.state
        if (location.state) {
            setParams(location.state); // עדכון params בכל שינוי ב-state של המיקום
            localStorage.setItem('searchParams', JSON.stringify(location.state)); // שמירה ב-localStorage
        }
    }, [location.state]);

    // קריאה ל-API בהתאם ל-params
    useEffect(() => {
        if (params) {
            console.log('params changed:', params); 
            getFilteredApartments(params)
                .then((y) => {
                    if (y.data) {
                        console.log(y);
                        
                        setList(y.data);
                    } else {
                        setList([]);
                    }
                })
                .catch((err) => {
                    console.error('Error fetching data:', err);
                    setList([]);
                });
        }
    }, [params]);
    
    return (
        <>
            <div className="cards">
                {list.length > 0 ? (
                    list.map((apartment, index) => <Card id={apartment._id}
                        key={index}
                        index={index}
                        title={apartment.nameApartment} // שם הדירה
                        description={apartment.description} // תיאור הדירה
                        images={apartment.image || []} // תמונות הדירה
                        price={apartment.price} // מחיר הדירה
                        numBeds={apartment.numBeds}
                        city={apartment.city} />) // הצגת הדירות
                ) : (
                    <p>No apartments found</p> // הודעה אם לא נמצאו דירות
                )}
            </div>
        </>
    );
};