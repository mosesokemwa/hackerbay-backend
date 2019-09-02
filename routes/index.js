var express = require('express');
var homeController = require('../controllers/homeController')
var authMiddleware = require('../middleware/authMiddleware')
var patchController = require('../controllers/patchController')


var router = express.Router();

// router.post('/home', verifyToken, homeController.home_page_get )
router.get('/home', authMiddleware.verifyToken, homeController.home_page_get )
router.patch('/patch-object', authMiddleware.verifyToken, patchController.patch_json_object )

module.exports = router;
