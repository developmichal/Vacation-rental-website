import jwt from 'jsonwebtoken'

export const checkEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format!' });
    }
    next();
};
export const checkAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        // Authorization - הרשאה
        return res.status(401).send('Authorization failed1!')
    }

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).send('Authorization failed2!')
    }

    // אימות של הטוקן - קיים - תקין ותקף
    // decoded - פיענוח
    jwt.verify(token, 'NOde147PROject45M&T', (error, decoded) => {
        if (error ||!decoded) {
            // authentication - אימות
            return res.status(401).send('Authentication failed3!')
        }
       
        if (decoded) {
            // decoded - מכיל את הנתונים של המשתמש לפיהם נוצר הטוקן
            // במקרה הצורך נשמור את הנתונים באובייקט הבקשה
            next()
        }
    })
}