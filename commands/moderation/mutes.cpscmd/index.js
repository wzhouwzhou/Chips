let rmute = require('./rmute');
let extEmojiBan = require('./emojiban');
let chipsmutebuild = require('./chipsmutebuild');

console.log('[CPSCMD][MODERATION][mutes] Building objects...');

rmute.metadata = {
  category: require('../').category,
  description: 'This command lets you mute server members by role',
  usage: 'rmute <User> <Optional Reason>',
  example: 'rmute @Evildeathpro✔#3981 stop',
  perm: [['global.moderation.mutes.pmute']],
  customperm: [['MANAGE_ROLES']],
};

extEmojiBan.metadata = {
  category: require('../').category,
  description: 'This command lets you disable people from using external emojis! It will create a role for you, but you have to make sure that the target user has no other roles which enable usage of external emojis!',
  usage: 'emojiban <User>',
  example: 'emojiban @Evildeathpro✔#3981',
  perm: [['global.moderation.mutes.extemojiban']],
  customperm: [['BAN_MEMBERS']],
};

chipsmutebuild.metadata = {
  category: require('../').category,
  description: 'This command lets you create a server mute role for Chips',
  usage: 'chipsmutebuild',
  example: 'chipsmutebuild',
  perm: [['global.moderation.mutes.pmute']],
  customperm: [['MANAGE_ROLES']],
};

console.log('[CPSCMD][MODERATION][mutes] Build objects complete!');
module.exports = [
  [rmute.name, rmute],
  [extEmojiBan.name, extEmojiBan],
  [chipsmutebuild.name, chipsmutebuild],
];
