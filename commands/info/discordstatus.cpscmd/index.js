
let discordstatus = require('./discordstatus');

console.log('[CPSCMD][INFO][discordstatus] Building objects...');
discordstatus.category = require('../').category;

discordstatus.description = 'Checks Discord status, getting data straight from status.discordapp.com!';

discordstatus.usage = 'discordstatus';

discordstatus.example = 'discordstatus';

console.log('[CPSCMD][INFO][discordstatus] Build objects complete!');
module.exports = [
  [discordstatus.name,discordstatus]
];
