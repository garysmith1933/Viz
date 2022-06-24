const Beat = require('../../db/models/beat');
const generateUploadURL = require('../s3');

const router = require('express').Router();

//get secure url from OUR server
router.get('/', async (req, res) => {
  const url = await generateUploadURL();
  res.send(url);
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const response = await Beat.addBeat(payload);
});

module.exports = router;
