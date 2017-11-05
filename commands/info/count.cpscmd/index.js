let rc = require('./rolecount');
let cc = require('./channelcount');
let ec = require('./emojicount');

console.log('[CPSCMD][INFO][count] Building objects...');

console.log('[CPSCMD][INFO][count] Building objects...');
rc.metadata = {
  category: require('../').category,
  description: 'Fetches the amount of roles',
  usage: 'rolecount',
  example: 'rolecount',
  perm: [['global.info.count.rolecount']],
  customperm: ['SEND_MESSAGES'],
};

cc.metadata = {
  category: require('../').category,
  description: 'Fetches the amount of channels',
  usage: 'channelcount, channelcount voice or channelcount text',
  example: 'channelcount text',
  perm: [['global.info.count.channelcount']],
  customperm: ['SEND_MESSAGES'],
};

ec.metadata = {
  category: require('../').category,
  description: 'Fetches the amount of emojis',
  usage: 'emojicount',
  example: 'emojicount',
  perm: [['global.info.count.emojicount']],
  customperm: ['SEND_MESSAGES'],
};


console.log('[CPSCMD][INFO][count] Build objects complete!');
module.exports = [
  [rc.name, rc],
  ['rolecount', rc],
  ['rc', rc],
  [cc.name, cc],
  ['channelcount', cc],
  ['cc', cc],
  [ec.name, cc],
  ['emojicount', cc],
  ['ec', ec],
];
