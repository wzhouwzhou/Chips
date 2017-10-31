let panic = require('./botpanic');

console.log('[CPSCMD][UTILITY][panic] Building objects...');

panic.metadata = {
  category: require('../').category,
  description: 'This command forces a shard restart!',
  usage: 'botpanic',
  example: 'botpanic',
  perm: [['OWNER.owner.botpanic']],
};

console.log('[CPSCMD][UTILITY][panic] Build objects complete!');
module.exports = [
  [panic.name, panic],
];
