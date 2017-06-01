
let quote = require('./quote');
console.log('[CPSCMD][INFO][quote] Building objects...');
quote.category = require('../').category;
quote.description = 'Quotes a message from someone else in the current channel.';
console.log('[CPSCMD][INFO][quote] Build objects complete!');
module.exports = [
  [quote.name,quote]
];
