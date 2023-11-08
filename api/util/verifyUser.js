import jwt from 'jsonwebtoken'
import { CustomErrorHandler } from '../middlewares/ErrorHandler.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) return next(CustomErrorHandler(401, "Unauthorised request"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(CustomErrorHandler(403, 'Invalid Token'));

        req.user = user;
        next();
    })
}