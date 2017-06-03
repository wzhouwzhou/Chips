
let clear = require('./clear');

console.log('[CPSCMD][MODERATION][clear] Building objects...');
clear.category = require('../').category;

clear.description = 'This command clears chat messages!';

clear.usage = 'clear <number 0-100>';

clear.example = 'clear 22';

console.log('[CPSCMD][MODERATION][clear] Build objects complete!');
module.exports = [
  [clear.name,clear]
];
