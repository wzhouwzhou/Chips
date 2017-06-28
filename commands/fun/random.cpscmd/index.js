
let dice = require('./roll');
let coin = require('./coinflip');
let randombuild = require('./randombuild');

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
randombuild.metadata = {
  category: require('../').category,
  description: 'This command generates a random build!',
  usage: 'randombuild <optional args>',
  example: 'randombuild autosmasher',
  perm: [['global.fun.random.coinflip']] //pls later fix
};

console.log('[CPSCMD][FUN][random] Build objects complete!');
module.exports = [
  [dice.name,dice],
  [coin.name,coin],
];
