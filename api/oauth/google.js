const router = require('express').Router();

router.get('/', (req, res) => {
  try {
    //googleOAuthHandler();
    res.send('Google OAuth backend is working');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
