
let calc = require('./-calc');
console.log('[CPSCMD][MODERATION][calc] Building objects...');
calc.category = require('../').category;

calc.description = 'This command simplifies expressions and solves equations!';

console.log('[CPSCMD][UTILITY][calc] Build objects complete!');
module.exports = [
  [calc.name,calc],
];
