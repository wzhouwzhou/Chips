let stc = require('./setchanneltopic');

console.log('[CPSCMD][UTILITY][setchanneltopic] Building objects...');

stc.metadata = {
  category: require('../').category,
  description: 'Changes to channel topic.',
  usage: 'settopic \"topic\"',
  example: 'settopic',
  perm: [['global.moderation.mutes.pmute']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][UTILITY][setchanneltopic] Build objects complete!');
module.exports = [
  [stc.name, stc],
  ['st', stc],
  ['sct', stc],
  ['settopic', stc],
  ['setchanneltopic', stc],
];
