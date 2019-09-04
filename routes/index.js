var express = require('express');
var homeController = require('../controllers/homeController')
var { verifyToken} = require('../middleware/authMiddleware')
var { patch_json_object } = require('../controllers/patchController')
var { create_thumbnail_post } = require('../controllers/thumbnailController')


var router = express.Router();

// router.post('/home', verifyToken, homeController.home_page_get )
router.get('/home', verifyToken, homeController.home_page_get )
router.patch('/apply-json-patch', verifyToken, patch_json_object )
router.post('/create-thumbnail', verifyToken, create_thumbnail_post )

module.exports = router;
