import React, { useEffect, useState } from "react";
import { getCategory } from "../api";
import './style.css';
import { useNavigate } from "react-router";

const Carousel = React.forwardRef((props, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [list, setList] = useState([]);
    const [images, setImages] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        getCategory()
            .then(x => setList(x.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        // console.log(list);        
        // localStorage.setItem("categories",JSON.stringify(list));
        if (list.length > 0) {
            const context = require.context('../pic', false, /\.(jpg|jpeg|png|gif)$/);
            const allImages = context.keys().map(context);

            const images1 = list.map((item) => ({
                id: item._id,
                src: allImages.filter((image) => {
                    const imageName = image.split('/').pop();
                    return imageName.includes(item._id);
                }),
                title: item.nameCategory,
            }));

            setImages(images1);

        }
    }, [list]);

    const moveSlide = (direction) => {
        setCurrentIndex((prevIndex) => (prevIndex + direction + images.length) % images.length);
    };
    const filterCat =(e) =>{
        navigate(`/Home/${e}`);
    }

    return (
        <div className="carousel-container" ref={ref}>
            <button
                className="carousel-btn prev"
                onClick={() => moveSlide(-1)}
                disabled={currentIndex === 0}
            >
                ❮
            </button>
            <div className="carousel-slides" style={{ transform: `translateX(-${currentIndex * 36}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className="carousel-card" onClick={()=>filterCat(image.id)}>
                        <div className="carousel-image">
                            <img src={image.src} alt={`Slide ${index + 1}`} />
                        </div>
                        <div className="carousel-caption">
                            <h3>{image.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <button
                className="carousel-btn next"
                onClick={() => moveSlide(1)}
                disabled={currentIndex + 3 >= images.length}
            >
                ❯
            </button>
        </div>
    );
});

export default Carousel;
