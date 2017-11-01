let bn = require('./botnick');

console.log('[CPSCMD][MODERATION][botnick] Building objects...');
bn.metadata = {
  category: require('../').category,
  description: 'This changes the bot nickname.',
  usage: 'botnick',
  example: 'botnick',
  perm: [['global.moderation.botnick.change']],
  customperm: ['MANAGE_NICKNAMES'],
};


console.log('[CPSCMD][MODERATION][botnick] Build objects complete!');
module.exports = [
  [bn.name, bn],
  ['botnick', bn],
  ['bn', bn],
];
