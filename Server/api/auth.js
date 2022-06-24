const User = require('../../db/models/user');

const router = require('express').Router();

router.post('/', async (req, res) => {
  const payload = req.body;
  if (req.body.signUp) {
    const response = await User.signUp(payload);
    res.json(response);
  } else if (req.body.lsAuthenticate) {
    const response = await User.findbyTOken(req.body.token);

    res.send(response);
  } else {
    const response = await User.signIn(payload);
    res.json(response);
  }
});

module.exports = router;
