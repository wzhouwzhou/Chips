let upermsin = require('./permissionsin');
console.log('[CPSCMD][UTILITY][perm] Building objects...');

upermsin.metadata = {
  category: require('../').category,
  description: 'This command does everything related to permissions! (incomplete)',
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
  ['permissions', upermsin],
  ['chperms', upermsin],
];
