let permsin = require('./permissionsin');
console.log('[CPSCMD][UTILITY][perm] Building objects...');

permsin.metadata = {
  category: require('../').category,
  description: 'This command does everything related to permissions! (incomplete)',
  perm: [['global.utility.perms.permissionsin']],
  customperm: ['MANAGE_ROLES'],
};

console.log('[CPSCMD][UTILITY][perm] Build objects complete!');
module.exports = [
  [permsin.name, permsin],
  ['permsin', permsin],
];
