
let pmute = require('./pmute');
let extEmojiBan = require('./emojiban');

console.log('[CPSCMD][MODERATION][mutes] Building objects...');
pmute.category = require('../').category;
extEmojiBan.category = require('../').category;

pmute.description = 'This command lets you mute server members permanently, however, a mute role must exist!';
extEmojiBan.description = 'This command lets you disable people from using external emojis! It will create a role for you, but you have to make sure that the target user has no other roles which enable usage of external emojis!';

pmute.usage = 'pmute <User>';
extEmojiBan.usage = 'emojiban <User>';

pmute.example = 'pmute @Evildeathpro✔#3981';
extEmojiBan.example = 'emojiban @Evildeathpro✔#3981';

console.log('[CPSCMD][MODERATION][mutes] Build objects complete!');
module.exports = [
  [pmute.name,pmute],
  [extEmojiBan.name,extEmojiBan]
];
