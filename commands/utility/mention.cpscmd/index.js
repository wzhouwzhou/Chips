let mention = require('./mention');

console.log('[CPSCMD][UTILITY][mention] Building objects...');

mention.metadata = {
  category: require('../').category,
  description: 'This command lets you mention roles!',
  usage: 'mention',
  example: 'mention',
  perm: [['global.utility.mention.select']],
  customperm: ['BAN_MEMBERS'],
};

console.log('[CPSCMD][UTILITY][mention] Build objects complete!');
module.exports = [
  [mention.name, mention],
];
