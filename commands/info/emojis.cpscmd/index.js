let emojis = require('./emojis');

console.log('[CPSCMD][INFO][info] Building objects...');
emojis.metadata = {
  category: require('../').category,
  description: 'Shows all emojis',
  usage: 'emojis',
  example: ['emojis'],
  perm: ['global.info.info'],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][info] Build objects complete!');
module.exports = [
  [emojis.name, emojis],
];
