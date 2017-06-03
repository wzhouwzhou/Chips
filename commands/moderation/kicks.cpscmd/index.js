
let kick = require('./kick');

console.log('[CPSCMD][MODERATION][kick] Building objects...');
kick.category = require('../').category;

kick.description = 'This command lets you kick members!';

kick.usage = 'kick <user> <Reason>';

kick.example = 'kick Evildeathpro✔#3981 Being a dad.';

console.log('[CPSCMD][MODERATION][kick] Build objects complete!');
module.exports = [
  [kick.name,kick]
];
