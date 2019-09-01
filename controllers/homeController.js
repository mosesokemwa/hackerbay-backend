var { validationResult } = require('express-validator');
var verifyToken  = require('../middleware/authMiddleware')
var jwt = require('jsonwebtoken')
require('dotenv').config()


exports.home_page_get = (req, res, next) => {
    const { token } = req.headers

    if(!token){
        return res.status(403).json({authorized: false, error: 'Missing token'})
    }

    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if(err) {
            return res.status(401).send({ authorized: false, error: 'verification has failed or token has expired.'}) 
        }
        req.user = decoded
        var errors = validationResult(req)
        
        // Check if there were errors from the form.
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        res.status(200).send({authorized: true, msg: "welcome home"})
    })
}
