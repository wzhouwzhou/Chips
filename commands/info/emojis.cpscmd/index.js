let emojis = require('./emojis');

console.log('[CPSCMD][INFO][emojis] Building objects...');
emojis.metadata = {
  category: require('../').category,
  description: 'Shows all emojis',
  usage: 'emojis',
  example: ['emojis'],
  perm: ['global.info.emojis'],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][emojis] Build objects complete!');
module.exports = [
  [emojis.name, emojis],
];
