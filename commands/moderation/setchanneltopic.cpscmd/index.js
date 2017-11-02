let stc = require('./setchanneltopic');

console.log('[CPSCMD][MODERATION][setchanneltopic] Building objects...');

stc.metadata = {
  category: require('../').category,
  description: 'Changes to channel topic.',
  usage: 'settopic \"topic\"',
  example: 'settopic',
  perm: [['global.info.info']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][MODERATION][setchanneltopic] Build objects complete!');
module.exports = [
  [stc.name, stc],
  ['st', stc],
  ['sct', stc],
  ['settopic', stc],
  ['setchanneltopic', stc],
];
