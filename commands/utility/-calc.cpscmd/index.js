
let calc = require('./-calc');

console.log('[CPSCMD][MODERATION][calc] Building objects...');

calc.metadata = {
  category: require('../').category,
  description: 'This command simplifies expressions and solves equations!',
  usage: '-calc <expression>',
  example: '-calc 1+1',
  perm: [['global.utility.calc.-calc']],
};

console.log('[CPSCMD][UTILITY][calc] Build objects complete!');
module.exports = [
  [calc.name,calc],
];
