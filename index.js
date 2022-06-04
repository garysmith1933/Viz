const express = require('express');
const path = require('path');
const app = express();

//configure port in package.json
const PORT = process.env.PORT || 8080;

//needed for heroku deploy
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.send('Hello World the server is running :(');
});

//React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
