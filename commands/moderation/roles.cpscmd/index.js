let addrole = require('./addrole');
let removerole = require('./removerole');
let src = require('./setrolecolor');

console.log('[CPSCMD][MODERATION][addrole] Building objects...');
addrole.metadata = {
  category: require('../').category,
  description: 'Work in progress!',
  usage: '-addrole',
  example: '-addrole',
  perm: [['OWNER.*']],
  customperm: ['MANAGE_ROLES'],
};

console.log('[CPSCMD][MODERATION][removerole] Building objects...');
removerole.metadata = {
  category: require('../').category,
  description: 'Work in progress!',
  usage: '-removerole',
  example: '-removerole',
  perm: [['OWNER.*']],
  customperm: ['MANAGE_ROLES'],
};

console.log('[CPSCMD][MODERATION][setrolecolor] Building objects...');
src.metadata = {
  category: require('../').category,
  description: 'Work in progress!',
  usage: '-setrolecolor',
  example: '-setrolecolor',
  perm: [['OWNER.*']],
  customperm: ['MANAGE_ROLES'],
};

console.log('[CPSCMD][MODERATION][role] Build objects complete!');
module.exports = [
  [addrole.name, addrole],
  ['ar', addrole],
  [removerole.name, removerole],
  ['rr', removerole],
  [src.name, src],
  ['src', src],
];
