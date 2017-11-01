let sc = require('./setchannel');

console.log('[CPSCMD][UTILITY][SETCHANNEL] Building objects...');

sc.metadata = {
  category: require('../').category,
  description: 'what do you think.',
  usage: 'setchannel',
  example: 'setchannel',
  perm: [['global.utility.setchannel.*']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][UTILITY][SETCHANNEL] Build objects complete!');
module.exports = [
  [sc.name, sc],
  ['sc', sc],
];
