
let help = require('./help');
console.log('[CPSCMD][INFO][help] Building objects...');
help.category = require('../').category;
help.description = 'The main help command. This command lists information about commands for the bot!';
help.usage = 'help';
help.example = 'help';
console.log('[CPSCMD][INFO][help] Build objects complete!');
module.exports = [
  [help.name,help]
];
