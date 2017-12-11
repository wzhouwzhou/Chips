/* eslint no-console: 'off' */
let happy = require('./happy');

console.log('[CPSCMD][FUN][happy] Building objects...');
happy.metadata = {
  category: require('../').category,
  description: 'Be happy!',
  usage: 'happy',
  example: 'happy',
  perm: [['global.fun.happy.happy']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][happy] Build objects complete!');

module.exports = [
  [happy.name, happy],
];
