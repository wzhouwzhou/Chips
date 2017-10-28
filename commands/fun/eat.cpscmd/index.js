let eat = require('./eat');

console.log('[CPSCMD][FUN][eat] Building objects...');

eat.metadata = {
  category: require('../').category,
  description: 'This command gives you your own bag of Chips!',
  usage: 'eat',
  example: 'eat',
  perm: [['global.fun.eat.eat']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][eat] Build objects complete!');
module.exports = [
  [eat.name, eat],
];
