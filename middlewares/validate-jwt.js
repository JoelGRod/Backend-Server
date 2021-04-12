const { response } = require("express");
const jwt = require('jsonwebtoken');


const validate_jwt = (req, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token error'
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.user_data = { uid, name };
        
        next(); // Everything In Its Right Place :)
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }
    
}

module.exports = {
    validate_jwt
}