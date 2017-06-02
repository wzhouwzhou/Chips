
let ass = require('./ass');
console.log('[CPSCMD][MODERATION][antispam] Building objects...');
ass.category = require('../').category;

ass.description = 'The name of this command is self explanatory.';

console.log('[CPSCMD][MODERATION][antispam] Build objects complete!');
module.exports = [
  [ass.name,ass],
];
