const { db, DataTypes } = require('../db');

const beatModel = db.define('beat', {
  name: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});

module.exports = beatModel;
