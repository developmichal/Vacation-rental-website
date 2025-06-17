import express from "express";
import { addCategory, getAllCategory } from "../controllers/category.js";
import { checkAuth } from "../middlewares.js";
import { getById } from "../controllers/apartment.js";


const router = express.Router()

router.get('', getAllCategory)
router.post('',checkAuth, addCategory)
router.get("/:id", getById);

export default router
