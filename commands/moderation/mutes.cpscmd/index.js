
let pmute = require('./pmute');
let extEmojiBan = require('./emojiban');

console.log('[CPSCMD][MODERATION][mutes] Building objects...');

pmute.metadata = {
  category: require('../').category,
  description: 'This command lets you mute server members permanently, however, a mute role must exist!',
  usage: 'pmute <User> <Optional Reason>',
  example: 'pmute @Evildeathpro✔#3981 stop',
  perm: [['global.moderation.mutes.pmute']],
  customperm: [['BAN_MEMBERS']],
};

extEmojiBan.metadata = {
  category: require('../').category,
  description: 'This command lets you disable people from using external emojis! It will create a role for you, but you have to make sure that the target user has no other roles which enable usage of external emojis!',
  usage: 'emojiban <User>',
  example: 'emojiban @Evildeathpro✔#3981',
  perm: [['global.moderation.mutes.extemojiban']],
  customperm: [['BAN_MEMBERS']],
};

console.log('[CPSCMD][MODERATION][mutes] Build objects complete!');
module.exports = [
  [pmute.name,pmute],
  [extEmojiBan.name,extEmojiBan]
];
