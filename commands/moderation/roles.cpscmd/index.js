let addrole = require('./addrole');
let removerole = require('./removerole');
let src = require('./setrolecolor');

console.log('[CPSCMD][MODERATION][addrole] Building objects...');
addrole.metadata = {
  category: require('../').category,
  description: 'Add roles to users!',
  usage: '-addrole <user> <role>',
  example: '-addrole @William Zhou Developer',
  perm: [['global.moderation.role.add']],
  customperm: ['MANAGE_ROLES'],
};

removerole.metadata = {
  category: require('../').category,
  description: 'Remove roles from users!',
  usage: '-removerole <user> <role>',
  example: '-removerole @William Zhou Developer',
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
