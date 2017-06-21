
let staffapp = require('./applyforstaff');

console.log('[CPSCMD][UTILITY][staffapp] Building objects...');

staffapp.metadata = {
  category: require('../').category,
  description: 'This command guides you through applying for a staff role in the support server!',
  usage: 'applyforstaff',
  example: 'applyforstaff',
  perm: [['global.utility.applyforstaff.apply']],
};

console.log('[CPSCMD][UTILITY][staffapp] Build objects complete!');
module.exports = [
  [staffapp.name,staffapp],
];
