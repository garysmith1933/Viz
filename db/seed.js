const { db } = require('./db');

const seed = async () => {
  try {
    await db.sync({ force: true });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = seed;
