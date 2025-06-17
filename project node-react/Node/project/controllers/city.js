import City from "../models/city.js"
// import { Apartment } from "Apartment.js"

//שליפת כל הערים
export const getAllCity = (req, res) => {
    City.find()
        .then(city => {
            res.status(200).send(city)
        })
        .catch(error => {
            res.status(500).sand({ error: error.massage })
        })
}
//הוספת עיר
export const addCity = (req, res) => {
    const { nameCity, } = req.body
    const newcity = new City({
        nameCity: nameCity,
        arrApartment: []
    })
    newcity.save()
        .then(city => {
            res.status(201).send(`message: create city ${city._id} succeed!`)
        })
        .catch(error => {
            res.status(500).send({ error: error.massage })
        })
}
export const getById = (req, res) => {
    City.findById(req.params.id)
        .then(city => {
            if (!city) {
                return res.status(404).send({ error: `City not found!` });
            }
            res.status(200).send(city);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};

