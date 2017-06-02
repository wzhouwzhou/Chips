
let boobs = require('./boobs');
console.log('[CPSCMD][MODERATION][nsfw] Building objects...');
boobs.category = require('../').category;

boobs.description = 'The name of this command is self explanatory.';

console.log('[CPSCMD][MODERATION][nsfw] Build objects complete!');
module.exports = [
  [boobs.name,boobs],
];
