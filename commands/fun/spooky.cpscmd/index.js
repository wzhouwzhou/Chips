
let spooky = require('./spooky');

console.log('[CPSCMD][INFO][text] Building objects...');
spooky.category = require('../').category;

spooky.description = 'Gives profile for a user! (WIP)';

spooky.usage = 'spooky number';

spooky.example = 'profile';

console.log('[CPSCMD][INFO][text] Build objects complete!');
module.exports = [
  [spooky.name,spooky]
];
