let ship = require('./ship');

console.log('[CPSCMD][MODERATION][ship] Building objects...');
ship.metadata = {
  category: require('../').category,
  description: 'This ships you with someone else.',
  usage: 'ship',
  example: 'ship',
  perm: [['global.fun.ship']],
};

console.log('[CPSCMD][MODERATION][ship] Build objects complete!');
module.exports = [
  [ship.name, ship],
];
