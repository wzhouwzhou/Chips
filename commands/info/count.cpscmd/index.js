
let mc = require('./membercount');
let rc = require('./rolecount')
let cc = require('./channelcount')

console.log('[CPSCMD][INFO][avatar] Building objects...');
mc.metadata = {
  category: require('../').category,
  description: 'This shows you the channel topic!',
  usage: 'membercount',
  example: 'membercount',
  perm: [['global.info.info']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][avatar] Building objects...');
rc.metadata = {
  category: require('../').category,
  description: 'Fetches the amount of roles',
  usage: 'rolecount',
  example: 'rolecount',
  perm: [['global.info.info']],
  customperm: ['SEND_MESSAGES'],
};

cc.metadata = {
  category: require('../').category,
  description: 'Fetches the amount of channels',
  usage: 'channelcount',
  example: 'channelcount',
  perm: [['global.info.info']],
  customperm: ['SEND_MESSAGES'],
};


console.log('[CPSCMD][INFO][avatar] Build objects complete!');
module.exports = [
  [mc.name,mc],
  ['membercount', mc],
  ['mc', mc],
  [rc.name,rc],
  ['rolecount', rc],
  ['rc', mc],
  [cc.name,cc],
  ['channelcount', mc],
  ['cc', cc],
];
