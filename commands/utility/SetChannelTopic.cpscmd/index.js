let st = require('./settopic');

console.log('[CPSCMD][INFO][ping] Building objects...');

st.metadata = {
  category: require('../').category,
  description: 'Changes to channel topic.',
  usage: 'settopic \"topic\"',
  example: 'settopic',
  perm: [['global.info.info']],
  customperm: ['MANAGE_CHANNELS'],
};

console.log('[CPSCMD][INFO][ping] Build objects complete!');
module.exports = [
  [st.name, st],
  ['st', st],
  ['sct', st],
  ['settopic', st],
  ['setchanneltopic', st],
];
