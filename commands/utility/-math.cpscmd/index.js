let math = require('./-math');

console.log('[CPSCMD][MODERATION][math] Building objects...');

math.metadata = {
  category: require('../').category,
  description: 'This command simplifies expressions and solves equations!',
  usage: '-math <expression>',
  example: '-math 1+1',
  perm: [['global.utility.math.*']],
};

console.log('[CPSCMD][UTILITY][math] Build objects complete!');
module.exports = [
  [math.name, math],
];
