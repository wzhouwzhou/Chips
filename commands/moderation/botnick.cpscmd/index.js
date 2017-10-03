
let bn = require('./botnick');

console.log('[CPSCMD][INFO][avatar] Building objects...');
bn.metadata = {
  category: require('../').category,
  description: 'This changes the bot nickname.',
  usage: 'botnick',
  example: 'botnick',
  perm: [['global.info.info']],
  customperm: ['MANAGE_NICKNAMES'],
};


console.log('[CPSCMD][INFO][avatar] Build objects complete!');
module.exports = [
  [bn.name,bn],
  ['botnick', bn],
  ['bn', bn],
];
