/* eslint no-console: 'off' */
let trivia = require('./trivia');

console.log('[CPSCMD][FUN][trivia] Building objects...');
trivia.metadata = {
  category: require('../').category,
  description: 'Play some trivia!',
  usage: 'trivia [topic] (difficulty)',
  example: 'trivia ',
  perm: [['global.games.trivia.start']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][trivia] Build objects complete!');
module.exports = [
  [trivia.name, trivia],
];
