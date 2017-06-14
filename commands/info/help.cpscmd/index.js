
let help = require('./help');

console.log('[CPSCMD][INFO][help] Building objects...');
help.metadata = {
  category: require('../').category,
  description: 'The main help command. This command lists information about commands for the bot!',
  usage: 'help',
  example: 'help',
  customperm: ['SEND_MESSAGES']
};

console.log('[CPSCMD][INFO][help] Build objects complete!');
module.exports = [
  [help.name,help]
];
