let insult = require('./insult');

console.log('[CPSCMD][FUN][insult] Building objects...');
insult.metadata = {
  category: require('../').category,
  description: 'Insults someone.',
  usage: 'insult (mention)',
  example: 'insult',
  perm: [['global.fun.insult']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][insult] Build objects complete!');
module.exports = [
  [insult.name, insult],
];
