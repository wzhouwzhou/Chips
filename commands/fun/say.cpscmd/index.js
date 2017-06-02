
let s = require('./s');
console.log('[CPSCMD][FUN][say] Building objects...');
s.category = require('../').category;

s.description = 'This command lets you say something through Chips!';

console.log('[CPSCMD][FUN][say] Build objects complete!');
module.exports = [
  [s.name,s],
];
