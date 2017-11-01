let st = require('./settopic');

console.log('[CPSCMD][MODERATION][settopic] Building objects...');

st.metadata = {
  category: require('../').category,
  description: 'Changes to channel topic.',
  usage: 'settopic \"topic\"',
  example: 'settopic',
  perm: [['global.info.info']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][MODERATION][settopic] Build objects complete!');
module.exports = [
  [st.name, st],
  ['st', st],
  ['sct', st],
  ['settopic', st],
  ['setchanneltopic', st],
];
