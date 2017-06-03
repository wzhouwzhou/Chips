
let points = require('./points');

console.log('[CPSCMD][UTILITY][points] Building objects...');
points.category = require('../').category;

points.description = 'This custom command shows user points in sinbad knights!';

points.usage = 'points <user>';

points.example = 'points @周珺 • WillyZ#6686';

console.log('[CPSCMD][UTILITY][points] Build objects complete!');
module.exports = [
  [points.name,points],
];
