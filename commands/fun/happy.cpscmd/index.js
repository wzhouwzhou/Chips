
let happy = require('./happy');
console.log('[CPSCMD][FUN][happy] Building objects...');
happy.category = require('../').category;
happy.description = 'Be happy!';
happy.usage = 'happy';
happy.example = 'happy';
console.log('[CPSCMD][FUN][happy] Build objects complete!');
module.exports = [
  [happy.name,happy],
];
