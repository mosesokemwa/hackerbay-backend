var express = require('express');
var jwt = require('jsonwebtoken')
var { check, validationResult, sanitizeBody } = require('express-validator');
var router = express.Router();
require('dotenv').config();

router.post('/login', [
    check('username').isEmail().trim(),
    check('password').isLength({ min: 5 }),
    sanitizeBody('*'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else{
        const username = req.body.username.toLowerCase()
        const password = req.body.password
        const token = jwt.sign({ username: username }, process.env.jwtSecret, { expiresIn: '10h' })
        // set token in header
        req.header['token'] = token
        res.status(200).send({user: username, authorized: true, token: token})
    }
});

module.exports = router;
