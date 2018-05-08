let giphy = require('./giphy');

console.log('[CPSCMD][UTILITY][giphy] Building objects...');
giphy.metadata = {
  category: require('../').category,
  description: 'Fetches gifs.',
  usage: 'giphy tags',
  example: 'giphy funny laugh',
  perm: [['global.utility.giphy.search']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][UTILITY][giphy] Build objects complete!');
module.exports = [
  [giphy.name, giphy],
];
