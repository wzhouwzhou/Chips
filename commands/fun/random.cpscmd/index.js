
let dice = require('./roll');
let coin = require('./coinflip');
console.log('[CPSCMD][FUN][random] Building objects...');
dice.category = require('../').category;
coin.category = require('../').category;
dice.description = 'This command rolls some dice!';
coin.description = 'This command flips a coin!';
dice.usage = 'dice <number1>d<number2>';
coin.usage = 'coinflip';
dice.example = 'dice 12d24';
coin.example = 'coinflip';
console.log('[CPSCMD][FUN][random] Build objects complete!');
module.exports = [
  [dice.name,dice],
  [coin.name,coin],
];
