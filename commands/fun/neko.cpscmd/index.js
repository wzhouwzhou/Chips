/* eslint no-console: 'off' */
let neko = require('./neko');

console.log('[CPSCMD][FUN][Neko] Building objects...');
neko.metadata = {
  category: require('../').category,
  description: 'Nekos!',
  usage: 'neko <No args>',
  example: 'neko',
  perm: [['global.fun.image.neko']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][Neko] Build objects complete!');
module.exports = [
  [neko.name, neko],
  ['nekos', neko],
];
