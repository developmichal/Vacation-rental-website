import Category from "../models/category.js"
// import { Apartment } from "Apartment.js"

//שליפת כל הקטגוריות
export const getAllCategory = (req, res) => {
    Category.find()
        .then(category => {
            res.status(200).send(category)
        })
        .catch(error => {
            res.status(500).sand({ error: error.massage })
        })
}
//הוספת קטגוריה
export const addCategory = (req, res) => {
    const { nameCategory, } = req.body
    const newCategory= new Category({
        nameCategory,
        })
    newCategory.save()
        .then(category => {
            res.status(201).send(`message: create category ${category._id} succeed!`)
        })
        .catch(error => {
            res.status(500).send({ error: error.massage })
        })
}

export const getById = async (req, res) => {
    const { id } = req.params;

    try {
        // שליפת הקטגוריה לפי ID
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).send({ error: "Category not found!" });
        }

        // שליחת הקטגוריה שנמצאה
        res.status(200).send(category);
    } catch (err) {
        // אם קרתה שגיאה
        res.status(500).send({ error: err.message });
    }
};
