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
});

User.signUp = async ({ username, pwd, firstName, lastName }) => {
  try {
    const user = await User.create({
      username,
      password: pwd,
      firstName,
      lastName,
    });
    console.log('This is the create user ' + user.username);
    return user;
  } catch (error) {
    console.log(error);
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
    console.log('this is the findone ' + user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = User;
