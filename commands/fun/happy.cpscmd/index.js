
let happy = require('./happy');
console.log('[CPSCMD][FUN][happy] Building objects...');
happy.category = require('../').category;

happy.description = 'Be happy!';

console.log('[CPSCMD][FUN][happy] Build objects complete!');
module.exports = [
  [happy.name,happy],
];
