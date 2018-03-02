let servername = require('./servername');

console.log('[CPSCMD][INFO][servername] Building objects...');

servername.metadata = {
  category: require('../').category,
  description: 'lucas is too lazy',
  usage: 'servername',
  example: 'servername',
  perm: [['global.info.info']],
  cusomperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][servername] Build objects complete!');
module.exports = [
  [servername.name, servername],
];
