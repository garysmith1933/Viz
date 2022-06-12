if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const seed = require('./db/seed');
const app = require('./Server');

//you can configure port in package.json for some reason windows not seeing port in package.json script
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

seed();
