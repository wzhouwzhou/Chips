let stats = require('./stats');
const botguilds = require('./botguilds');
const uptime = require('./uptime');

console.log('[CPSCMD][INFO][stats] Building objects...');
stats.metadata = {
  category: require('../').category,
  description: 'Gives stats for chips including guild/user count, cpu usage, and more!',
  usage: 'stats <no args>',
  example: 'stats',
  perm: [['public.info.stats.stats']],
  customperm: ['SEND_MESSAGES'],
};
botguilds.metadata = {
  category: require('../').category,
  description: 'Gives the top 100 servers chips is in',
  usage: 'botguilds <no args>',
  example: 'botguilds',
  perm: [['public.info.stats.stats']],
  customperm: ['SEND_MESSAGES'],
};
uptime.metadata = {
  category: require('../').category,
  description: 'Gives uptimes for chips shards!',
  usage: 'uptime <no args>',
  example: 'uptime',
  perm: [['public.info.stats.stats']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][stats] Build objects complete!');
module.exports = [
  [stats.name, stats],
  [botguilds.name, botguilds],
  ['botguild', botguilds],
  [uptime.name, uptime],
];
