import ENVVARS from "../config/envVars.js";
import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
    // Check for token in cookies first
    let token = req.cookies['jwt-roadhelp'];
    
    // If not in cookies, check Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).send({ success: false, message: 'Unauthorized' });
    }
    
    jwt.verify(token, ENVVARS.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ success: false, message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};
