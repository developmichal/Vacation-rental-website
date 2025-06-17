
// const Card = ({ id, title, city, description, images = [], price, numBeds }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [scale, setScale] = useState(1); // ערך ברירת מחדל של גודל התמונה
//   const navigate = useNavigate(); // יצירת משתנה navigate

//   const prevImage = () => {
//     setScale(1.1);
//     setCurrentImageIndex(
//       currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
//     );
//   };

//   const nextImage = () => {
//     setScale(1.05);
//     setCurrentImageIndex(
//       currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
//     );
//   };

//   const resetScale = () => {
//     setScale(1);
//   };

//   const handleDetailsClick = () => {
//     // שימוש ב-navigate לניווט לדף של פרטי הדירה
//     navigate(`/apartment/getById/${id}`);
//   };

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>{title}</h3>
//       </div>
//       <div className="card-body">
//         <div className="carousel">
//           <button className="prev-button" onClick={prevImage} disabled={images.length <= 1}>
//             ❮
//           </button>
//           <div className="carousel-images">
//             {images.length > 0 ? (
//               <div className="image-container">
//                 <img
//                   src={images[currentImageIndex]}
//                   alt={title}
//                   className="card-image"
//                   style={{ transform: `scale(${scale})` }}
//                   onTransitionEnd={resetScale}
//                 />
//               </div>
//             ) : (
//               <div className="image-container">
//                 <img
//                   src={`${process.env.PUBLIC_URL}/pic/1.jpg`}
//                   alt="No Image Available"
//                   className="card-image"
//                 />
//               </div>
//             )}
//           </div>
//           <button className="next-button" onClick={nextImage} disabled={images.length <= 1}>
//             ❯
//           </button>
//         </div>

//         <div className="card-details">
//           <div className="mi">
//             <i className="fa fa-map-marker-alt">
//               <span> {city} </span>
//             </i>
//           </div>
//           <div className="price">
//             <span>{price} ₪</span>
//           </div>
//           <div className="num-beds">
//             <span>{numBeds} מיטות</span>
//           </div>
//         </div>

//         <p>{description}</p>
//         <button className="detilse" onClick={handleDetailsClick}>
//           פרטים נוספים לחץ כאן
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Card;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // הוספת useNavigate
import "./all1.css";

import { useNavigate } from "react-router-dom"; // הוספת useNavigate
// import "./all.css"; 
import { getApartmentById, getCityById } from '../api.js'; // הפונקציה שמביאה את הדירה לפי ה-ID
import React, { useState, useEffect } from 'react';

const Card = ({ id, title,city, description, images, price, numBeds }) => {
    console.log("nechami cohen ", city);
    
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1); // ערך ברירת מחדל של גודל התמונה
  const [cityy, setCity] = useState(null); // מצב לשמירת פרטי העיר

  const navigate = useNavigate(); // יצירת משתנה navigate
useEffect(() => {
      getCityById(city)
        .then(response => {
            console.log("nechami chck",city);
          console.log(response);
          setCity(response.data.nameCity); // Storing city name
        })
        .catch(error => {
            console.log("nechami chck error", city);
          console.error('Error fetching city data:', error); // Error handling
        });
    
  }, [city]); 

  const prevImage = () => {
    setScale(1.1); 
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  const nextImage = () => {
    setScale(1.05); 
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  const resetScale = () => {
    setScale(1);
  };

  const handleDetailsClick = () => {
    navigate(`/apartment/getById/${id}`);
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <div className="carousel">
          <button className="prev-button" onClick={prevImage}>
            ❮
          </button>
          <div className="carousel-images">
            {images.length > 0 && (
              <div className="image-container">
                <img
                  src={images[currentImageIndex]}
                  alt={title}
                  className="card-image"
                  style={{ transform: `scale(${scale})` }} 
                  onTransitionEnd={resetScale}
                />
              </div>
            )}
          </div>
          <button className="next-button" onClick={nextImage}>
            ❯
          </button>
        </div>

        <div className="card-details">
        <div className="mi">
           <i class="fa fa-map-marker-alt"> <span>{cityy} </span></i>
          </div>
          <div className="price">
            <span>{price} ₪</span>
          </div>
          <div className="num-beds">
            <span>{numBeds} מיטות</span>
          </div>
        </div>

        <p>{description}</p>
        <button className="detilse" onClick={handleDetailsClick}>
          פרטים נוספים לחץ כאן
        </button>
      </div>
    </div>
  );
};

export default Card;
