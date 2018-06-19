let meme = require('./meme');

console.log('[CPSCMD][FUN][meme] Building objects...');
meme.metadata = {
  category: require('../').category,
  description: 'Sends a chips meme!',
  usage: 'meme <no args>',
  example: 'meme',
  perm: [['global.fun.image.chipsmeme']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][meme] Build objects complete!');
module.exports = [
  [meme.name, meme],
  ['chipsmeme', meme],
];
