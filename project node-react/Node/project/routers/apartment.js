import express from "express";
import { addApartment, getAllApartment, getFilteredApartments, getApartmentsByAdvertiser, getApartmentsByCategory, getById, getByNumBeds, remove, updateApartment } from "../controllers/apartment.js";
import { checkAuth } from "../middlewares.js";

const router = express.Router()

router.get('', getAllApartment)

router.get('/getById/:id', getById);
router.get('/getByNumBeds/:numBeds', getByNumBeds);
// router.get('/getApartmentByIdCity/:id', getApartmentByIdCity);
router.get('/getApartmentsByAdvertiser/:advertiserId', getApartmentsByAdvertiser);
router.get('/getApartmentsByCategory/:id', getApartmentsByCategory);
router.post('/search', getFilteredApartments);

router.post('', checkAuth, addApartment)
router.patch('/update/:id/:id1', checkAuth, updateApartment)
router.delete('/remove/:id', checkAuth, remove)

export default router
