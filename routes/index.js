var express = require('express');
var { validationResult } = require('express-validator');
var verifyToken  = require('../middleware/authMiddleware')

var router = express.Router();

router.get('/', verifyToken, function (req, res, next) {
    var errors = validationResult(req)

    // Check if there were errors from the form.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    res.status(200).send({authorized: true, msg: "welcome home"})
  })

module.exports = router;
