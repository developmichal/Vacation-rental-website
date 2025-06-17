import './style.css';
import { Nav } from "./Nav";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getAllCityById, getByNumBeds, getCategoryById } from '../api';

export const Search = () => {
    const params = useParams();
    const [apartments, setApartments] = useState([]);
    const city = params.idCity || null;
    const cat = params.idCat || null;
    const beds = params.numBeds || null;

    useEffect(() => {
        const fetchApartments = async () => {
            debugger
            try {
                const cityResponse = city ? await getAllCityById(city) : { data: [] };
                const bedsResponse = beds ? await getByNumBeds(beds) : { data: [] };
                const catResponse = cat ? await getCategoryById(cat) : { data: [] };

                console.log("City Response: ", cityResponse.data);
                console.log("Beds Response: ", bedsResponse.data);
                console.log("Category Response: ", catResponse.data);

                const cityData = cityResponse.data;
                const bedsData = bedsResponse.data;
                const categoryData = catResponse.data;

                // ביצוע סינון על פי הנתונים שנשלחו
                const filteredApartments = cityData.filter(cityItem =>
                    (!beds || bedsData.some(bed => bed.cityId === cityItem._id)) &&
                    (!cat || categoryData.some(category => category._id === cityItem.categoryId))
                );

                setApartments(filteredApartments);
            } catch (error) {
                console.error("Error fetching apartments:", error);
            }
        };

        fetchApartments();
    }, [city, cat, beds]); // ריצה רק כאשר הפרמטרים משתנים

    return (
        <>
            <Nav />
            <div className="apartments-container">
                {apartments.length > 0 ? (
                    apartments.map(apartment => (
                        <div key={apartment._id} className="apartment">
                            <h3>{apartment.name}</h3>
                            <p>Category: {apartment.category}</p>
                            <p>City: {apartment.city}</p>
                            <p>Beds: {apartment.numBeds}</p>
                        </div>
                    ))
                ) : (
                    <p>No apartments found.</p>
                )}
            </div>
        </>
    );
};
