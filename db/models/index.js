const Beat = require('./beat');
const Playlist = require('./playlist');
const User = require('./user');
const Song = require('./songs')
Beat.belongsTo(User);
User.hasMany(Beat);

Playlist.hasMany(Song)
Song.belongsToMany(Playlist)

module.exports = { Beat, User };
