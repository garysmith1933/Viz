const jwt = require('jsonwebtoken');

const { db, DataTypes } = require('../db');

const User = db.define('user', {
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  oauth: {
    type: DataTypes.STRING,
    unique: true,
  },
});

User.byGoogle = async (googleEmail, given_name) => {
  const user = await User.findOne({
    where: { oauth: googleEmail },
  });
  if (!user) {
    const createUser = await User.create({
      oauth: googleEmail,
      firstName: given_name,
    });
    return createUser;
  }
  return user;
};

User.signUp = async ({ username, pwd, firstName, lastName }) => {
  try {
    const user = await User.create({
      username,
      password: pwd,
      firstName,
      lastName,
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

User.findbyTOken = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = id && (await User.findByPk(id));
    if (!user) {
      const data = { deleteLocalStorage: true };
      return data;
    }
    return user;
  } catch (error) {
    console.log('User.findByToken Error  ' + error);
  }
};

User.signIn = async ({ username, pwd }) => {
  try {
    const user = await User.findOne({
      where: {
        username,
        password: pwd,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = User;
