import express from "express";
import { login, register,getAll } from "../controllers/advertiser.js";

import { checkEmail } from "../middlewares.js";

const router = express.Router()
router.post('/login', login)
router.get('',getAll )
router.post('/register',checkEmail, register)
 
export default router
  