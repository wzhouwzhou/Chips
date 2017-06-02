
let nR = require('./nR');
console.log('[CPSCMD][UTILIY][nR] Building objects...');
nR.category = require('../').category;

nR.description = 'What a mysterious command.';

console.log('[CPSCMD][UTILITY][nR] Build objects complete!');
module.exports = [
  [nR.name,nR],
];
