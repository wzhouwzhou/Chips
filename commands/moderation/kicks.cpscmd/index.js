
let kick = require('./kick');

console.log('[CPSCMD][MODERATION][kick] Building objects...');

kick.metadata = {
  category: require('../').category,
  description: 'This command lets you kick members!',
  usage: 'kick <User> <Reason>',
  example: 'kick Evildeathpro✔#3981 Being dumb.',
  perm: [['global.moderation.kicks.kick']],
  customperm: ['KICK_MEMBERS'],
};

console.log('[CPSCMD][MODERATION][kick] Build objects complete!');
module.exports = [
  [kick.name,kick]
];
