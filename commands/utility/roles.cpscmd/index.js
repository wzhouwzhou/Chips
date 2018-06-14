let addrole = require('./addrole');
let removerole = require('./removerole');
let src = require('./setrolecolor');

console.log('[CPSCMD][UTILITY][addrole] Building objects...');
addrole.metadata = {
  category: require('../').category,
  description: 'Add roles to users!',
  usage: 'addrole <user> <role>',
  example: 'addrole @William Zhou Developer',
  perm: [['global.utility.role.add']],
  customperm: ['MANAGE_ROLES'],
};

removerole.metadata = {
  category: require('../').category,
  description: 'Remove roles from users!',
  usage: 'removerole <user> <role>',
  example: 'removerole @William Zhou Developer',
  perm: [['global.utility.role.remove']],
  customperm: ['MANAGE_ROLES'],
};

src.metadata = {
  category: require('../').category,
  description:'Sets colors of a role!',
  usage: 'setrolecolor <#color> <role>',
  example: 'setrolecolor> #ff0000 Red',
  perm: [['global.utility.role.setcolor']],
  customperm: ['MANAGE_ROLES'],
};

console.log('[CPSCMD][UTILITY][role] Build objects complete!');
module.exports = [
  [addrole.name, addrole],
  ['ar', addrole],
  [removerole.name, removerole],
  ['rr', removerole],
  [src.name, src],
  ['src', src],
];
