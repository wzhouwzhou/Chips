
const sid = require('./serverid');
const cid = require('./channelid');
const lastmsgid = require('./lastmessageid')

console.log('[CPSCMD][INFO][id] Building objects...');
sid.metadata = {
  category: require('../').category,
  description: 'Fetches server id',
  usage: 'serverid',
  example: ['serverid'],
  perm: [["global.info.info"]],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][id] Building objects...');
cid.metadata = {
  category: require('../').category,
  description: 'Fetches channel id',
  usage: 'channelid',
  example: ['channelid'],
  perm: [["global.info.info"]],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][id] Building objects...');
lastmsgid.metadata = {
  category: require('../').category,
  description: 'Fetches last sended message id',
  usage: 'lastmessageid',
  example: ['lastmessageid'],
  perm: [["global.info.info"]],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][id] Build objects complete!');
module.exports = [
  [sid.name,sid],
  ['guildid', sid],
  ['gid', sid],
  ['sid', sid],
  [cid.name,cid],
  ['channelid', cid],
  ['cid', cid],
  [lastmsgid.name,lastmsgid],
  ['lmid', lastmsgid],
  ['lastmsgid', lastmsgid],
];
