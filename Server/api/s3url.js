
const Beat = require('../../db/models/beat');
const generateUploadURL = require('../s3');

const router = require('express').Router();

//get secure url from OUR server
router.get('/', async (req, res) => {
  const url = await generateUploadURL();
  res.send(url);
});
router.get('/beats', async (req, res) => {
  const payload = req.headers.authorization;
  console.log('HTis is the payload  ' + payload);
  const beats = await Beat.getBeats(payload);
  console.log('This is the api call to the db' + beats);
  res.send(beats);
});

router.post('/', async (req, res) => {
  const payload = req.body;
  const response = await Beat.addBeat(payload);
  res.send(response);
});

module.exports = router;
