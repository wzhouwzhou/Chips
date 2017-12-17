/* eslint no-console: 'off' */

let r34 = require('./rule34');

console.log('[CPSCMD][NSFW][r34] Building objects...');
r34.metadata = {
  category: require('../').category,
  description: 'Searches rule34.',
  usage: 'r34 <query>',
  example: 'r34 ass',
  perm: [['global.nsfw.*']],
};

console.log('[CPSCMD][NSFW][r34] Build objects complete!');
module.exports = [
  [r34.name, r34],
  ['r34', r34],
];
