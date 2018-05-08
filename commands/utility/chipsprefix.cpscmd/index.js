let prefix = require('./chipsprefix');

console.log('[CPSCMD][UTILITY][prefix] Building objects...');

prefix.metadata = {
  category: require('../').category,
  description: 'This command lets you set Chips\' prefix!',
  usage: 'chipsprefix set <new prefix>',
  example: 'chipsprefix set c!',
  perm: [['global.moderation.chipsprefix.chipsprefix']],
  customperm: ['ADMINISTRATOR'],
};

console.log('[CPSCMD][UTILITY][prefix] Build objects complete!');
module.exports = [
  [prefix.name, prefix],
  [prefix.name, 'chipsprefix'],
];
