let channelname = require('./channelname');

console.log('[CPSCMD][INFO][channelname] Building objects...');
channelname.metadata = {
  category: require('../').category,
  description: 'Shows channelname',
  usage: 'channelname',
  example: ['channelname'],
  perm: ['global.info.info'],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][channelname] Build objects complete!');
module.exports = [
  [channelname.name, channelname],
  ['cn', channelname],
];
