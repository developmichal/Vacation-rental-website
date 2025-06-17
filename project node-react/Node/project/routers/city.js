import express from "express";

import{ addCity, getAllCity,getById} from "../controllers/city.js"
import { checkAuth } from "../middlewares.js";

const router = express.Router()

router.get('', getAllCity)
router.post('',checkAuth, addCity)
router.get('/getById/:id', getById)


export default router 