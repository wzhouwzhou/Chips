let google = require('./google');

console.log('[CPSCMD][UTILITY][google] Building objects...');
google.metadata = {
  category: require('../').category,
  description: 'This uses the Google Search Engine!',
  usage: 'google [content]',
  example: ['google hi', 'google urban'],
  perm: [['global.news.*']],
  customperm: ['SEND_MESSAGES'],
};
console.log('[CPSCMD][UTILITY][google] Build objects complete!');
module.exports = [
  [google.name, google],
];
