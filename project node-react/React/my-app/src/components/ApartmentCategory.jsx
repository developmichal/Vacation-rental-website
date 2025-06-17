import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getApartmentsByCategory } from "../api";
import Card from "./card";
import { Nav } from "./Nav";
import "./style.css"


export const ApartmentCategory=()=>{
    const params = useParams();
    const catId = params.id;

    const [list,setList]=useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
 
    

useEffect(() => {
    getApartmentsByCategory(catId)
            .then(x => setList(x.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
       console.log(list);
       
        }, [list]);


    return <>
    <Nav></Nav>
             <div className="alCard">
            <h1>דירות להשכרה</h1>

            {error && <p>שגיאה: {error.message}</p>} {/* אם יש שגיאה, מציגים אותה */}

            {loading ? (
                <p>טוען דירות...</p> // אם הדירות עדיין נטענות, מציגים הודעה
            ) : (
                <div className="cards-container">
                    {list.map((apartment, index) => (
                        // לכל דירה, נציג כרטיס
                        <Card
                        id={apartment._id}
                        key={index}
                        index={index}
                        title={apartment.nameApartment} // שם הדירה
                        description={apartment.description} // תיאור הדירה
                        images={apartment.image || []} // תמונות הדירה
                        price={apartment.price} // מחיר הדירה
                        numBeds={apartment.numBeds}  />
                    ))}
                </div>
            )}
        </div>

    </>
}