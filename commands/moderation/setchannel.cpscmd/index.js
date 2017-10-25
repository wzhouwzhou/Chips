
let sc = require('./setchannel');

console.log('[CPSCMD][INFO][roles] Building objects...');

sc.metadata = {
  category: require('../').category,
  description: 'what do you think.',
  usage: 'setchannel',
  example: 'setchannel',
  perm: [['global.moderation.setchannel.edit']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][INFO][roles] Build objects complete!');
module.exports = [
  [sc.name,sc],
  ['sc', sc],
];
