
let dice = require('./roll');
let coin = require('./coinflip');
console.log('[CPSCMD][FUN][random] Building objects...');
dice.category = require('../').category;
coin.category = require('../').category;

dice.description = 'This command rolls some dice!';
coin.description = 'This command flips a coin!';

console.log('[CPSCMD][FUN][random] Build objects complete!');
module.exports = [
  [dice.name,dice],
  [coin.name,coin],
];
