let meme = require('./meme');

console.log('[CPSCMD][FUN][meme] Building objects...');
meme.metadata = {
  category: require('../').category,
  description: 'meme!',
  usage: 'meme',
  example: 'meme',
  perm: [['global.fun.*']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][meme] Build objects complete!');
module.exports = [
  [meme.name, meme],
];
