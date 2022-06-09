const router = require('express').Router();

router.use('/s3url', require('../api/s3url'));

module.exports = router;
