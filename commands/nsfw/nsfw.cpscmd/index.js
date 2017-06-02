
let nsfw = require('./nsfw');
console.log('[CPSCMD][MODERATION][nsfw] Building objects...');
nsfw.category = require('../').category;

nsfw.description = 'This command lists Chips\' nsfw-related commands.';

console.log('[CPSCMD][MODERATION][nsfw] Build objects complete!');
module.exports = [
  [nsfw.name,nsfw],
];
