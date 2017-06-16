
let nR = require('./nR');
console.log('[CPSCMD][UTILIY][nR] Building objects...');
nR.metadata = {
  category: require('../').category,
  description: 'What a mysterious command.',
  usage: 'nR 12345',
  perm: [['global.utility.nR.nR']],
};

console.log('[CPSCMD][UTILITY][nR] Build objects complete!');
module.exports = [
  [nR.name,nR],
];
