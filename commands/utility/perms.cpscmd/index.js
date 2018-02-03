let upermsin = require('./permissionsin');
const rperms = require('./rolepermissions');
console.log('[CPSCMD][UTILITY][perm] Building objects...');

upermsin.metadata = {
  category: require('../').category,
  description: "This command gets a member's permissions in this, or a specified channel.",
  usage: 'permissionsin [fuzzy search]',
  example: 'permissionsin William Zhou',
  perm: [['global.utility.perms.permissionsin']],
  customperm: ['MANAGE_ROLES'],
};
rperms.metadata = {
  category: require('../').category,
  description: "This command gets a role's permissions server-wide.",
  usage: 'rolepermissions [fuzzy search]',
  example: 'rolepermissions Staff',
  perm: [['global.utility.perms.permissionsin']],
  customperm: ['MANAGE_ROLES'],
};

console.log('[CPSCMD][UTILITY][perm] Build objects complete!');
module.exports = [
  [upermsin.name, upermsin],
  ['permsin', upermsin],
  ['userpermissionsin', upermsin],
  ['userpermsin', upermsin],
  ['upermsin', upermsin],
  ['upermissions', upermsin],
  ['chperms', upermsin],
  [rperms.name, rperms],
  ['rperms', rperms],
  ['roleperms', rperms],
  ['rpermissions', rperms],
];
