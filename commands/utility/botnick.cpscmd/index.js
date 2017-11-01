let bn = require('./botnick');

console.log('[CPSCMD][UTILITY][botnick] Building objects...');
bn.metadata = {
  category: require('../').category,
  description: 'This changes the bot nickname.',
  usage: 'botnick <Name>',
  example: 'botnick Chips-Sux',
  perm: [['global.utility.botnick.change']],
  customperm: ['MANAGE_NICKNAMES'],
};


console.log('[CPSCMD][UTILITY][botnick] Build objects complete!');
module.exports = [
  [bn.name, bn],
  ['botnick', bn],
  ['bn', bn],
];
