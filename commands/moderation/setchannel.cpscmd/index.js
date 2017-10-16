
let sc = require('./setchannel');

console.log('[CPSCMD][INFO][roles] Building objects...');

sc.metadata = {
  category: require('../').category,
  description: 'what do you think.',
  usage: 'setchannel',
  example: 'setchannel',
  perm: [['global.info.info']],
  cuscmperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][roles] Build objects complete!');
module.exports = [
  [sc.name,sc],
  ['setchannel', sc],
];