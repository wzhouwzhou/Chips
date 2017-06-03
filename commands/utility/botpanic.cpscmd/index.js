
let panic = require('./botpanic');

console.log('[CPSCMD][UTILITY][panic] Building objects...');
panic.category = require('../').category;

panic.description = 'This command forces a shard restart!';

panic.usage = 'botpanic';

panic.example = 'botpanic';

console.log('[CPSCMD][UTILITY][panic] Build objects complete!');
module.exports = [
  [panic.name,panic],
];
