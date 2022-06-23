const queryString = require('querystring');

const googleOAuthHandler = require('./googleOAuthHandler');

const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const response = await googleOAuthHandler(req, res);

    res.redirect(process.env.ORIGIN + '/' + response);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
