
let ae = require('./addemoji');

console.log('[CPSCMD][INFO][ping] Building objects...');

ae.metadata = {
  category: require('../').category,
  description: 'Changes to channel topic.',
  usage: 'settopic \"topic\"',
  example: 'settopic',
  perm: [['global.info.info']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][INFO][ping] Build objects complete!');
module.exports = [
  [ae.name,ae],
  ['addemoji', ae],
];
