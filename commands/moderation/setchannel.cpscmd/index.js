let sc = require('./setchannel');

console.log('[CPSCMD][MODERATION][setchannel] Building objects...');

sc.metadata = {
  category: require('../').category,
  description: 'what do you think.',
  usage: 'setchannel',
  example: 'setchannel',
  perm: [['global.moderation.setchannel.*']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][MODERATION][setchannel] Build objects complete!');
module.exports = [
  [sc.name, sc],
  ['sc', sc],
];
