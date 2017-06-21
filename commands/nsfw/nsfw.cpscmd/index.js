
let nsfw = require('./nsfw');

console.log('[CPSCMD][NSFW][nsfw] Building objects...');

nsfw.metadata = {
  category: require('../').category,
  description: 'This command lists Chips\' nsfw-related commands.',
  usage: 'nsfw',
  example: 'nsfw',
  perm: [['global.nsfw.nsfw.info','global.info.help.help']],
};

console.log('[CPSCMD][NSFW][nsfw] Build objects complete!');
module.exports = [
  [nsfw.name,nsfw],
];
