let addrole = require('./addrole');
let removerole = require('./removerole');
let src = require('./setrolecolor');

console.log('[CPSCMD][MODERATION][addrole] Building objects...');
addrole.metadata = {
  category: require('../').category,
  description: 'Work in progress!',
  usage: '-addrole',
  example: '-addrole',
  perm: [['global.moderation.role.add']],
  customperm: ['MANAGE_ROLES'],
};

removerole.metadata = {
  category: require('../').category,
  description: 'Work in progress!',
  usage: '-removerole',
  example: '-removerole',
  perm: [['global.moderation.role.remove']],
  customperm: ['MANAGE_ROLES'],
};

src.metadata = {
  category: require('../').category,
  description: 'Work in progress!',
  usage: '-setrolecolor',
  example: '-setrolecolor',
  perm: [['global.moderation.role.setcolor']],
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
