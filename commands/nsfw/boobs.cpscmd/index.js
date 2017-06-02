
let boobs = require('./boobs');
console.log('[CPSCMD][NSFW][boobs] Building objects...');
boobs.category = require('../').category;

boobs.description = 'The name of this command is self explanatory.';

console.log('[CPSCMD][NSFW][boobs] Build objects complete!');
module.exports = [
  [boobs.name,boobs],
];
