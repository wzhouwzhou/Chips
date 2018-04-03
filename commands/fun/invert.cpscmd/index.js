/* eslint no-console: 'off' */
let invert = require('./invert');
console.log('[CPSCMD][FUN][invert] Building objects...');

invert.metadata = {
  category: require('../').category,
  description: 'This command lets you make a invert pfp through Chips!',
  usage: 'invert <mention user>',
  example: 'invert @Evildeathpro#4442',
  perm: [['global.fun.image.invert']],
};

console.log('[CPSCMD][FUN][invert] Build objects complete!');
module.exports = [
  [invert.name, invert],
  ['inverted', invert],
];
