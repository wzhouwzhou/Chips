
let ass = require('./ass');

console.log('[CPSCMD][NSFW][ass] Building objects...');
ass.category = require('../').category;

ass.description = 'The name of this command is self explanatory.';

ass.usage = 'ass';

ass.example = 'ass';

console.log('[CPSCMD][NSFW][ass] Build objects complete!');
module.exports = [
  [ass.name,ass],
];
