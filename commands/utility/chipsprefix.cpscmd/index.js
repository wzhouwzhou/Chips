let chipsprefix = require('./chipsprefix');

console.log('[CPSCMD][UTILITY][chipsprefix] Building objects...');

chipsprefix.metadata = {
  category: require('../').category,
  description: 'This command lets you set Chips\' prefix!',
  usage: 'chipsprefix set <new prefix>',
  example: 'chipsprefix set c!',
  perm: [['global.moderation.chipsprefix.chipsprefix']],
  customperm: ['ADMINISTRATOR'],
};

console.log('[CPSCMD][UTILITY][chipsprefix] Build objects complete!');
module.exports = [
  [chipsprefix.name, chipsprefix],
];
