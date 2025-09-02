 import jwt from 'jsonwebtoken';
 import ENVVARS from '../config/envVars.js';

export const genTokenAndSetCookie = (user, res) => {
    const token = jwt.sign({ userId: user._id }, ENVVARS.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt-roadhelp', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: "strict",
      maxAge: 3600000 // 1 hour
    });
    return token
}