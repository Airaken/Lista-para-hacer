//requires 
const jwt = require('jsonwebtoken');
// validates the Token
let validateToken = (req, res, next) => {
    let token = process.env.TOKEN;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token not valid'
                }
            })
        }
        req.correo = decoded.correo;
        next();
    });
};

module.exports = { validateToken };