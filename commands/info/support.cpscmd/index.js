
let support = require('./support');
console.log('[CPSCMD][INFO][support] Building objects...');
support.category = require('../').category;
support.description = 'Links Chips\' support server!';
support.usage = 'support';
support.example = 'support';
console.log('[CPSCMD][INFO][support] Build objects complete!');
module.exports = [
  [support.name,support]
];
