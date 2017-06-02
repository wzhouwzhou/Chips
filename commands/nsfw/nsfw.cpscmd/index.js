
let nsfw = require('./nsfw');
console.log('[CPSCMD][NSFW][nsfw] Building objects...');
nsfw.category = require('../').category;

nsfw.description = 'This command lists Chips\' nsfw-related commands.';

console.log('[CPSCMD][NSFW][nsfw] Build objects complete!');
module.exports = [
  [nsfw.name,nsfw],
];
