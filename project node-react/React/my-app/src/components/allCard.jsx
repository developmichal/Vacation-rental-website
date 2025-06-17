import { useEffect, useState } from "react"
import { getApartment } from "../api.js"
import Card from "./card.jsx"
export const AllCard = () => {
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    useEffect(() => {
        getApartment()
            .then(x => {
                console.log(x);
                setApartments(x);
                setLoading(false);

            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [])
    return <>
         <div>
            <h1>דירות להשכרה</h1>

            {error && <p>שגיאה: {error.message}</p>}

            {loading ? (
                <p>טוען דירות...</p>
            ) : (
                <div className="cards-container">
                    {apartments.map((apartment, index) => (
                                                console.log(apartment),

                        <Card
                        id={apartment._id}
                        key={index}
                        index={index}
                        title={apartment.nameApartment} // שם הדירה
                        description={apartment.description} // תיאור הדירה
                        images={apartment.image || []} // תמונות הדירה
                        price={apartment.price} // מחיר הדירה
                        numBeds={apartment.numBeds}
                        city={apartment.city||"lo"} 
                        
                        />
                    ))}
                </div>
            )}
        </div>


        


    </>
}