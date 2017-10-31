let info = require('./info');

console.log('[CPSCMD][INFO][info] Building objects...');
info.metadata = {
  category: require('../').category,
  description: 'Shows server, channel, role, and user info.',
  usage: 'info <action> <...extra detail>',
  example: ['info channel #general', 'info user @JohnSmith', 'info role Admin'],
  perm: [['global.info.info'], 'global.info.info.server', 'global.info.channel', 'global.info.role', 'global.info.user', 'global.info.user.self'],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][info] Build objects complete!');
module.exports = [
  [info.name, info],
];
