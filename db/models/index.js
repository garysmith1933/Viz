const Beat = require('./beat');
const User = require('./user');

Beat.belongsTo(User);
User.hasMany(Beat);

module.exports = { Beat, User };
