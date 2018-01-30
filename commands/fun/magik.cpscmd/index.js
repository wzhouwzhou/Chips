/* eslint no-console: 'off' */
const magik = require('./magik');

console.log('[CPSCMD][FUN][magik] Building objects...');
magik.metadata = {
  category: require('../').category,
  description: "Magik someone's avatar!",
  usage: 'magik (@ mention)',
  example: 'magik @William Zhou#0001',
  perm: [['global.fun.image.magik']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][magik] Build objects complete!');
module.exports = [
  [magik.name, magik],
];
