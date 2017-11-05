let ct = require('./channeltopic');

console.log('[CPSCMD][INFO][channeltopic] Building objects...');
ct.metadata = {
  category: require('../').category,
  description: 'This shows you the channel topic!',
  usage: 'channeltopic',
  example: 'channeltopic',
  perm: [['global.info.channeltopic']],
  customperm: ['SEND_MESSAGES'],
};


console.log('[CPSCMD][INFO][channeltopic] Build objects complete!');
module.exports = [
  [ct.name, ct],
  ['channeltopic', ct],
  ['ct', ct],
];
