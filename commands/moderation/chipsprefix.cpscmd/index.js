
let chipsprefix = require('./chipsprefix');

console.log('[CPSCMD][MODERATION][chipsprefix] Building objects...');
chipsprefix.category = require('../').category;

chipsprefix.description = 'This command lets you set Chips\' prefix!';

chipsprefix.usage = 'chipsprefix set <new prefix>';

chipsprefix.example = 'chipsprefix set c!';

console.log('[CPSCMD][MODERATION][chipsprefix] Build objects complete!');
module.exports = [
  [chipsprefix.name,chipsprefix]
];
