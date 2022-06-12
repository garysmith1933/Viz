const { beatModel: Beat } = require('./beat');
const { userModel: User } = require('./user');

Beat.belongsTo(User);
User.hasMany(Beat);

module.exports = { Beat, User };
