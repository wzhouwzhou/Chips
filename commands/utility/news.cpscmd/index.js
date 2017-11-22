let news = require('./news');

console.log('[CPSCMD][UTILITY][news] Building objects...');
news.metadata = {
  category: require('../').category,
  description: 'This searches for news!',
  usage: 'news (latest/headlines) [search query]',
  example: ['news latest bitcoin', 'news headlines apple', 'news trump'],
  perm: [['global.news.*']],
  customperm: ['SEND_MESSAGES'],
};
console.log('[CPSCMD][UTILITY][news] Build objects complete!');
module.exports = [
  [news.name, news],
];
