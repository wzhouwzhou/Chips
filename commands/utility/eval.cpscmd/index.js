
let regeval = require('./eval');
let asynceval = require('./async');

console.log('[CPSCMD][UTILITY][eval] Building objects...');
regeval.category = require('../').category;
asynceval.category = require('../').category;

regeval.description = 'This command evaluates some javascript!';
asynceval.description = 'This command evaluates some javascript in an async function!';

console.log('[CPSCMD][UTILITY][eval] Build objects complete!');
module.exports = [
  [regeval.name,regeval],
  [asynceval.name,asynceval],
];
