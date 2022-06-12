const { db, DataTypes } = require('../db');

const beat = db.define('beat', {
  name: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});

module.exports = beat;
