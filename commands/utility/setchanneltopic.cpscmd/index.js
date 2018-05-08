let sct = require('./setchanneltopic');

console.log('[CPSCMD][UTILITY][setchanneltopic] Building objects...');

sct.metadata = {
  category: require('../').category,
  description: 'Changes to channel topic.',
  usage: 'settopic \"topic\"',
  example: 'settopic',
  perm: [['global.moderation.mutes.pmute']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][UTILITY][setchanneltopic] Build objects complete!');
module.exports = [
  [sct.name, sct],
  ['st', sct],
  ['sct', sct],cfègujkp;
  
  ['settopic', sct],
  ['setchanneltopic', sct],
];
