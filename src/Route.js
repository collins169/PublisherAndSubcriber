const router = require('express').Router();
const controller = require('./Controller');
const {validate, validateRequest} = require('./utils/Validator');

router.post('/subscribe/:topic', validate.subscribe, validateRequest, controller.subscribe)
.post('/publish/:topic', controller.publish)

module.exports = router;