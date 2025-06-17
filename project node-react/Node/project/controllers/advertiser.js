import  jwt  from "jsonwebtoken"
import Advertiser  from "../models/advertiser.js"

export const getAll = (req, res) => {
    Advertiser.find()
        .then(advertiser => {
            res.status(200).send(advertiser);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};

//התחברות
export const login = (req, res) => {
    const { email, password } = req.body
    Advertiser.find().where({ email: { $eq: email } })
        .then(async advertisers => {
            if (advertisers.length == 0) {
                return res.stutus(404).send({ error: `email and password are not match` })
            }
            let [advertiser] = advertisers
            if (advertiser.password != password) {
                console.log('password is not match!');
                return res.status(404).send({ error: `email and password are not match` })
            }
            const token = await jwt.sign(
                { email, password },
                process.env.SECRET,
                {
                    // expiresIn: '1hr', // hours
                    // expiresIn: '10m', // minutes
                    // expiresIn: '30d', // days
                    // expiresIn: '20ms', // mili seconds
                    // expiresIn: '20s' // seconds
                }
            )

            res.status(200).send({ advertiser, token })

        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//הרשמה
export const register = (req, res) => {

    const {  email, phone1, phone2, password } = req.body

    Advertiser.find()
        .where({ email: { $eq: email } })
        .then(advertisers => {
            if (advertisers.length > 0) {
                return res.status(400).send({ error: 'email exists!' })
            }

            const newAdvertiser = new Advertiser({
                email,
                phone1,
                phone2,
                password,
                arrApartment:[]
            })

            // פונקציית הוספה - מופעלת על האובייקט
            newAdvertiser.save()
                .then(async advertiser => {

                    // create token
                    // מקבלת שלשה פרמטרים:
                    // 1. נתונים של המשתמש שנכנס - ניתן לפענח את הטוקן ולשלוף את הנתונים ולכן לא נשמור נתונים רגישים
                    // 2. מחרוזת יחודית למערכת
                    // 3. אובייקט אפשרויות - ניתן להגדיר תוקף לטוקן
                    // בשביל לתפוס את הטוקן שנוצר שלא יחזור אובייקט ריק await הגדרנו 
                    // async מסיבה זו הוצרכנו להגדיר על הפונקציה החיצונית - שמפעילה את יצירת הטוקן
                    const token = await jwt.sign(
                        { email,password},
                        process.env.SECRET,
                        {
                            expiresIn: '1hr', // hours
                            // expiresIn: '10m', // minutes
                            // expiresIn: '30d', // days
                            // expiresIn: '20ms', // mili seconds
                            // expiresIn: '60s' // seconds
                        }
                    )

                    res.status(200).send({ advertiser, token })
                })
                .catch(err => {
                    res.status(500).send({ error: err.message })
                })
        })
}

