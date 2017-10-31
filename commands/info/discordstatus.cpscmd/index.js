let discordstatus = require('./discordstatus');

console.log('[CPSCMD][INFO][discordstatus] Building objects...');
discordstatus.metadata = {
  category: require('../').category,
  description: 'Checks Discord status, getting data straight from status.discordapp.com!',
  usage: 'discordstatus',
  example: 'discordstatus',
  perm: [['global.info.discordstatus.discordstatus']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][discordstatus] Build objects complete!');
module.exports = [
  [discordstatus.name, discordstatus],
];
