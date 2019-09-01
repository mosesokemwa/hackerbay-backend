var express = require('express');
var homeController = require('../controllers/homeController')

var router = express.Router();
router.get('/home', homeController.home_page_get )

module.exports = router;
