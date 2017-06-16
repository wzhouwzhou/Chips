
let dice = require('./roll');
let coin = require('./coinflip');

console.log('[CPSCMD][FUN][random] Building objects...');

dice.metadata = {
  category: require('../').category,
  description: 'This command rolls some dice!',
  usage: 'dice <number1>d<number2> <...Optional Other>',
  example: 'dice 12d24',
  perm: [['global.fun.random.roll']]
};

coin.metadata = {
  category: require('../').category,
  description: 'This command flips a coin!',
  usage: 'coinflip',
  example: 'coinflip',
  perm: [['global.fun.random.coinflip']]
};

console.log('[CPSCMD][FUN][random] Build objects complete!');
module.exports = [
  [dice.name,dice],
  [coin.name,coin],
];
