let servericon = require('./roles');

console.log('[CPSCMD][INFO][servericon] Building objects...');

servericon.metadata = {
  category: require('../').category,
  description: 'lucas is too lazy',
  usage: 'servericon',
  example: 'servericon',
  perm: [['global.info.info']],
  cusomperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][servericon] Build objects complete!');
module.exports = [
  [servericon.name, servericon],
];
