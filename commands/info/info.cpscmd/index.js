let info = require('./info');
let rm = require('./rmembers');
let cm = require('./cmembers');
let si = require('./serverinfo');
let ci = require('./channelinfo');

console.log('[CPSCMD][INFO][info] Building objects...');
info.metadata = {
  category: require('../').category,
  description: 'Shows server, channel, role, and user info.',
  usage: 'info <action> <...extra detail>',
  example: ['info channel #general', 'info user @JohnSmith', 'info role Admin'],
  perm: [['global.info.info'], 'global.info.info.server', 'global.info.channel', 'global.info.role',
    'global.info.user', 'global.info.user.self'],
  customperm: ['SEND_MESSAGES'],
};

rm.metadata = {
  category: require('../').category,
  description: 'Shows all users that have a role',
  usage: 'rolemembers <role>',
<<<<<<< HEAD
  example: ['rolemembers ++'],
  perm: [['global.info.']],
  customperm: ['SEND_MESSAGES'],
};

ci.metadata = {
  category: require('../').category,
  description: 'Shows info about channels',
  usage: 'channelinfo',
  example: ['channelinfo'],
  perm: [['global.info.channel']],
=======
  example: ['rolemembers Admins'],
  perm: [['global.info.*']],
>>>>>>> 71880e581f2c707c99b9e85836f15e4036e3e013
  customperm: ['SEND_MESSAGES'],
};

cm.metadata = {
  category: require('../').category,
  description: 'Shows all users that an see a channel',
  usage: 'channelmembers <role>',
  example: ['channelmembers Admins'],
  perm: [['global.info.*']],
  customperm: ['SEND_MESSAGES'],
};

si.metadata = {
  category: require('../').category,
  description: 'Shows server info.',
  usage: 'serverinfo',
  example: ['serverinfo'],
  perm: [['global.info.info.server']],
  customperm: ['SEND_MESSAGES'],
};

ci.metadata = {
  category: require('../').category,
  description: 'Shows channel info.',
  usage: 'channelinfo (optional channel name or id)',
  example: ['channelinfo'],
  perm: [['global.info.channel']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][info] Build objects complete!');
module.exports = [
  [info.name, info],
  [rm.name, rm],
  ['rolemembers', rm],
  ['rolemember', rm],
  [si.name, si],
  ['si', si],
  [ci.name, ci],
  ['ci', ci],
  [cm.name, cm],
  ['channelmember', cm],
  ['channelmembers', cm],
  ['cm', cm],
];
