
let points = require('./points');
console.log('[CPSCMD][UTILITY][points] Building objects...');
points.category = require('../').category;

points.description = 'This custom command shows user points in sinbad knights!';

console.log('[CPSCMD][UTILITY][points] Build objects complete!');
module.exports = [
  [points.name,points],
];
