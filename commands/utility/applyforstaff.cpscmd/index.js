
let staffapp = require('./applyforstaff');
console.log('[CPSCMD][UTILITY][staffapp] Building objects...');
staffapp.category = require('../').category;

staffapp.description = 'This command guides you through applying for a staff role in the support server!';

console.log('[CPSCMD][UTILITY][staffapp] Build objects complete!');
module.exports = [
  [staffapp.name,staffapp],
];
