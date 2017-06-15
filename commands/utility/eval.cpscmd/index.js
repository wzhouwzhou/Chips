
let regeval = require('./eval');
let asynceval = require('./async');

console.log('[CPSCMD][UTILITY][eval] Building objects...');
regeval.metadata = {
  category: require('../').category,
  description: 'This command evaluates some javascript!',
  perm: ['OWNER.*'],
};
asynceval.category = require('../').category;

asynceval.description = 'This command evaluates some javascript in an async function!';

console.log('[CPSCMD][UTILITY][eval] Build objects complete!');
module.exports = [
  [regeval.name,regeval],
  [asynceval.name,asynceval],
];
