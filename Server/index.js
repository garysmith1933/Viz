const express = require('express');
const app = express();

const path = require('path');

//needed for heroku deploy
app.use(express.static(path.join(__dirname, 'client/build')));

//middleware stating if /api comes in send it to the folder api it will hit the index file which will route it
app.use('/api', require('../api'));

app.get('/', (req, res) => {
  res.send('Hello World the server is running :(');
});

//React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;
