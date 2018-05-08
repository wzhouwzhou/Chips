let gif = require('./giphy');

console.log('[CPSCMD][UTILITY][gif] Building objects...');
gif.metadata = {
  category: require('../').category,
  description: 'Fetches gifs.',
  usage: 'giphy tags',
  example: 'giphy funny laugh',
  perm: [['global.utility.giphy.search']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][UTILITY][gif] Build objects complete!');
module.exports = [
  [giphy.name, giphy],
  [giphy.name, 'gif'],
];
