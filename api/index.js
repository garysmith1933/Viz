const router = require('express').Router();

router.use('/hello', require('./hello'));
router.use('/s3url', require('./s3url'));

module.exports = router;
