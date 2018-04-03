let so = require('./serverowner');

console.log('[CPSCMD][INFO][serverowner] Building objects...');

so.metadata = {
  category: require('../').category,
  description: 'what do you think.',
  usage: 'serverowner',
  example: 'serverowner',
  perm: [['global.info.info']],
  cusomperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][serverowner] Build objects complete!');
module.exports = [
  [so.name, so],
  ['serverowner', so],
];
