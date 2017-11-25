let addrole = require('./addrole');
let removerole = require('./removerole');

console.log('[CPSCMD][MODERATION][addrole] Building objects...');
addrole.metadata = {
  category: require('../').category,
  description: 'Work in progress!',
  usage: '-addrole',
  example: '-addrole',
  perm: [['global.moderation.role.add']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][MODERATION][removerole] Building objects...');
removerole.metadata = {
  category: require('../').category,
  description: 'Work in progress!',
  usage: '-removerole',
  example: '-removerole',
  perm: [['global.moderation.role.remove']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][MODERATION][role] Build objects complete!');
module.exports = [
  [addrole.name, addrole],
  ['ar', addrole],
  [removerole.name, removerole],
  ['rr', removerole],
];
