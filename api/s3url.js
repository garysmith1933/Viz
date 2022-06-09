const generateUploadURL = require('../Server/s3');

const router = require('express').Router();

//get secure url from OUR server
router.get('/', async (req, res) => {
  const url = await generateUploadURL();
  console.log(url);
  console.log({ url });
  res.send(url);
});

module.exports = router;
