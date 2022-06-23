const User = require('../../db/models/user');

const router = require('express').Router();

router.post('/', async (req, res) => {
  const payload = req.body;
  console.log('this is it ' + req.body);
  if (req.body.signUp) {
    const response = await User.signUp(payload);
    console.log('This is signup' + response);
    res.json(response);
  } else if (req.body.lsAuthenticate) {
    console.log('lsAuthenticate ran in auth');
    const response = await User.findbyTOken(req.body.token);
    console.log('api token');
    //console.log(response);
    res.send(response);
  } else {
    const response = await User.signIn(payload);
    //console.log(response);
    res.json(response);
  }
});

module.exports = router;
