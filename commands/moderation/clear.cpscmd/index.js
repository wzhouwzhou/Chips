
let clear = require('./clear');
console.log('[CPSCMD][MODERATION][clear] Building objects...');
clear.category = require('../').category;
clear.description = 'This command clears chat messages!';
console.log('[CPSCMD][MODERATION][clear] Build objects complete!');
module.exports = [
  [clear.name,clear]
];
