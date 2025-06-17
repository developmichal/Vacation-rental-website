import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // הוספת useParams
import "./all1.css"; // סטיילים שלך
import "../big.css"; // סטיילים שלך
import { getApartmentById, getCityById } from '../api.js'; // הפונקציה שמביאה את הדירה לפי ה-ID
import { Nav } from './Nav.jsx';

const BigCard = () => {
  const { id } = useParams(); // שולף את ה-ID מה-URL
  const [apartment, setApartment] = useState(null); // מצב לשמירת פרטי הדירה
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // מצב לשלוט בתמונה המוצגת
  const [scale, setScale] = useState(1); // מצב לגודל התמונה
  const [cityy, setCity] = useState(null); // מצב לשמירת פרטי העיר

  // ברגע ש-ID משתנה, מבצע בקשה לשרת
  useEffect(() => {
    getApartmentById(id)
      .then(response => {
        console.log(response);
        setApartment(response.data.apartment); // שמור את המידע במצב
      })
      .catch(error => {
        console.error('שגיאה בטעינת הדירה:', error); // טיפול בשגיאות
      });
  }, [id]);

  useEffect(() => {
    if (apartment && apartment.city) { 
        // console.log("nechami chck", apartment.city);
        // Ensure apartment and city are not null
      getCityById(apartment.city)
        .then(response => {
          console.log(response);
          setCity(response.data.nameCity); // Storing city name
        })
        .catch(error => {
          console.error('Error fetching city data:', error); // Error handling
        });
    }
  }, [apartment]); 

  const images = apartment?.image || []; // אם apartment או images לא קיימים, מאתחל למערך ריק

  const nextImage = () => {
    setScale(1.1); // הגדלת התמונה
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setScale(1.1); // הגדלת התמונה
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  const resetScale = () => {
    setScale(1); // החזרת התמונה לגודל הרגיל
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!apartment || images.length === 0) return <div>טוען...</div>; // ממתין לטעינת המידע

  return <>
  <Nav></Nav>
    <div className="big-card-container-unique">
      <div className="big-card-unique">
        <div className="carousel-unique">
          <button className="prev-button-unique" onClick={prevImage}>❮</button>
          <div className="carousel-images-unique">
            <div className="image-container-unique">
              <img
                src={images[currentImageIndex]} // הצגת התמונה הנוכחית
                alt={apartment.nameApartment}
                className="big-card-image-unique"
                style={{ transform: `scale(${scale})` }} // האנימציה של שינוי הגודל
                onTransitionEnd={resetScale} // החזרת הגודל ברגע שהאנימציה מסתיימת
              />
            </div>
          </div>
          <button className="next-button-unique" onClick={nextImage}>❯</button>
          <div className="thumbnail-carousel">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => selectImage(index)}
              />
            ))}
          </div>
        </div>
        <div className="big-card-content-unique">
          <div className="big-card-header-unique">
            <h1>{apartment.nameApartment}</h1>
          </div>
          <div className="big-card-details-unique">
            <div className="icon-container">
              <i className="fa fa-map-marker-alt"></i>
              <span>כתובת: {cityy ? `${cityy} ${apartment.address}` : 'loading city....'}</span>
            </div>
            <div className="icon-container">
              <i className="fa fa-shekel-sign"></i>
              <span><strong>מחיר:</strong> {apartment.price} ₪</span>
            </div>
            <div className="icon-container">
              <i className="fa fa-info-circle"></i>
              <span><strong>תיאור:</strong> {apartment.description}</span>
            </div>
            <div className="icon-container">
              <i className="fa fa-bed"></i>
              <span><strong>מספר מיטות:</strong> {apartment.numBeds}</span>
            </div>
            {apartment.additives && apartment.additives.length > 0 && (
              <div className="icon-container">
                <i className="fa fa-plus-circle"></i>
                <span><strong>תוספות:</strong></span>
                <ul>
                  {apartment.additives.map((additive, index) => (
                    <li key={index}>{additive}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
};

export default BigCard;
