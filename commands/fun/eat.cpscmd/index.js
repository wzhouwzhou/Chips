
let eat = require('./eat');
console.log('[CPSCMD][FUN][eat] Building objects...');
eat.category = require('../').category;
eat.description = 'This command gives you your own bag of Chips!';
eat.usage = 'eat';
eat.example = 'eat';
console.log('[CPSCMD][FUN][eat] Build objects complete!');
module.exports = [
  [eat.name,eat],
];
