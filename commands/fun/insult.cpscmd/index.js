let insult = require('./insult');
let kill = require('./kill');

console.log('[CPSCMD][FUN][insult] Building objects...');
insult.metadata = {
  category: require('../').category,
  description: 'Insults someone.',
  usage: 'insult (mention)',
  example: 'insult',
  perm: [['global.fun.insult']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][kill] Building objects...');
kill.metadata = {
  category: require('../').category,
  description: 'Kills someone.',
  usage: 'kill (mention)',
  example: 'kill @Evildeathpro#4442',
  perm: [['global.fun.insult']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][insult] Build objects complete!');
module.exports = [
  [insult.name, insult],
  [kill.name, kill],
  ['kill', kill],
  ['omar', kill],
];
