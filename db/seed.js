const { db } = require('./db');
const { User, Beat } = require('./models/index');

const seed = async () => {
  try {
    await db.sync({ force: true });
    const eric = await User.create({
      firstName: 'Eric New',
      lastName: 'Rodgers',
      username: 'user',
      password: 'pass',
    });
    const capstoneBeat = await Beat.create({
      name: 'cappy',
      url: 'www.google.com',
    });
    await capstoneBeat.setUser(eric);
  } catch (error) {
    console.log({ error });
  }
};

module.exports = seed;
