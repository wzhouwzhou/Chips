
let stoptyping = require('./stoptyping');

console.log('[CPSCMD][UTILITY][stoptyping] Building objects...');
stoptyping.category = require('../').category;

stoptyping.description = 'This command stops the bot from typing if it is stuck!';

stoptyping.usage = 'stoptyping';

stoptyping.example = 'stoptyping';

console.log('[CPSCMD][UTILITY][stoptyping] Build objects complete!');
module.exports = [
  [stoptyping.name,stoptyping],
];
