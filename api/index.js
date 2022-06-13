const router = require('express').Router();

router.use('/hello', require('./hello'));
router.use('/s3url', require('./s3url'));
router.use('/auth', require('./auth'));

module.exports = router;
