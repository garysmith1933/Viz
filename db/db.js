const { Sequelize, DataTypes } = require('sequelize');

//DB Logs
const logging = { logging: false };

const db = new Sequelize(process.env.DATABASE_URL, logging);

module.exports = { db, DataTypes };
