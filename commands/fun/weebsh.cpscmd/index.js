/* eslint no-console: 'off' */
let hug = require('./hug');

console.log('[CPSCMD][FUN][weeb] Building objects...');
hug.metadata = {
  category: require('../').category,
  description: 'Hug someone!',
  usage: 'hug (@ mention)',
  example: '-hug @William Zhou',
  perm: [['global.fun.weeb.hug']],
};

console.log('[CPSCMD][FUN][weeb] Build objects complete!');
module.exports = [
  [hug.name, hug],
];
