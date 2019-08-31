var jwt = require('jsonwebtoken')
require('dotenv').config()


exports.verifyToken = (req, res, next) => {
    var { token } = req.headers.token

    if(!token){
        return res.status(403).json({authorized: false, error: 'Missing token'})
    }

    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if(err) {
            return res.status(401).send({ authorized: false, error: 'verification has failed or token has expired.'}) 
        }
        req.user = decoded
        next()
    })
}
