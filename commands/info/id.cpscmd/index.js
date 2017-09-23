
const sid = require('./serverid');
const cid = require('./channelid');

console.log('[CPSCMD][INFO][id] Building objects...');
sid.metadata = {
  category: require('../').category,
  description: 'Fetches server id',
  usage: 'serverid',
  example: ['serverid'],
  perm: [["global.info.info"]],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][id] Build objects complete!');
module.exports = [
  [sid.name,sid],
  ['guildid', sid],
  ['sid', sid],
];
