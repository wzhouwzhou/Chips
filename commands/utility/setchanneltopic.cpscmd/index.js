const stc = require('./setchanneltopic');

console.log('[CPSCMD][UTILITY][setchanneltopic] Building objects...');

stc.metadata = {
  category: require('../').category,
  description: 'Changes the channel topic.',
  usage: 'settopic <new topic>',
  example: 'settopic',
  perm: [['global.utility.setchannel.topic']],
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
