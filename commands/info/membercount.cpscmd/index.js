let mc = require('./membercount');

console.log('[CPSCMD][INFO][membercount] Building objects...');
mc.metadata = {
  category: require('../').category,
  description: 'This shows you the channel topic!',
  usage: 'membercount',
  example: 'membercount',
  perm: [['global.info.info']],
  customperm: ['SEND_MESSAGES'],
};


console.log('[CPSCMD][INFO][membercount] Build objects complete!');
module.exports = [
  [mc.name, mc],
  ['membercount', mc],
  ['mc', mc],
];
