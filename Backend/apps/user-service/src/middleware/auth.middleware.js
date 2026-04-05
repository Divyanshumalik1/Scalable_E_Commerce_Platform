import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

export const authMiddleware = (req, res, next) => {

    const auth_header = req.headers['authorization'];

    if (!auth_header) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
 
    const token = auth_header.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try{
        // This is so simple to do with the jwt library, it abstracts away all the complexity of verifying the token, checking its signature, and decoding its payload. It also handles token expiration and other security checks for you. You just need to provide the token and the secret key, and it will do the rest.
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();

    }catch(err){
        return res.status(401).json({ message: 'Invalid token' });
    }

};


