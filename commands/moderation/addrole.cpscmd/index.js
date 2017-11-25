let addrole = require('./addrole');

console.log('[CPSCMD][MODERATION][addrole] Building objects...');
addrole.metadata = {
  category: require('../').category,
  description: 'Work in progress!',
  usage: '-addrole',
  example: '-addrole',
  perm: [['global.moderation.addrole.*']],
  customperm: ['MANAGE_ROLES'],
};

console.log('[CPSCMD][MODERATION][addrole] Build objects complete!');
module.exports = [
  [addrole.name, addrole],
];
