/* eslint no-console: 'off' */
let triggered = require('./triggered');
console.log('[CPSCMD][FUN][triggered] Building objects...');

triggered.metadata = {
  category: require('../').category,
  description: 'This command lets you make a triggered pfp through Chips!',
  usage: 'triggered <mention user>',
  example: 'triggered @Evildeathpro#4442',
  perm: [['global.fun.image.triggered']],
};

console.log('[CPSCMD][FUN][triggered] Build objects complete!');
module.exports = [
  [triggered.name, triggered],
  ['triggered', triggered],
];
