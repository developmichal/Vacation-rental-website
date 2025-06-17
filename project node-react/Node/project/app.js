import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import cityRouter from './routers/city.js'
import advertiserRouter from './routers/advertiser.js'
import categoryRouter from './routers/category.js'
import apartmentRouter from './routers/apartment.js'


const app = express()
const port = 3001

dotenv.config()

app.use(bodyParser.json())
app.use(cors())
mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('connect to mongoDB! 👍😊');
    })
    .catch(err => {             
        console.log({ error: err.message });
    })

app.use('/city', cityRouter)
app.use('/advertiser',advertiserRouter )
app.use('/category',categoryRouter )
app.use('/apartment',apartmentRouter)
app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})
