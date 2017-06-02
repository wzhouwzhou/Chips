
let kick = require('./kick');
console.log('[CPSCMD][MODERATION][kick] Building objects...');
kick.category = require('../').category;
kick.description = 'This command lets you kick members!';
console.log('[CPSCMD][MODERATION][kick] Build objects complete!');
module.exports = [
  [kick.name,kick]
];
