
let happy = require('./happy');
let everyone = require('./everyone');

console.log('[CPSCMD][FUN][happy] Building objects...');
happy.metadata = {
  category: require('../').category,
  description: 'Be happy!',
  usage: 'happy',
  example: 'happy',
  perm: [['global.fun.happy.happy']],
  customperm: ['SEND_MESSAGES'],
};
everyone.metadata = {
  category: require('../').category,
  description: 'Whenver somebody mentions everyone!',
  usage: 'everyone',
  example: 'everyone',
  perm: [['global.fun.happy.everyone']],
};

console.log('[CPSCMD][FUN][happy] Build objects complete!');

module.exports = [
  [happy.name,happy],
  [everyone.name,everyone],
];
