/* eslint no-console: 'off' */
const warp = require('./warp');

console.log('[CPSCMD][FUN][warp] Building objects...');
warp.metadata = {
  category: require('../').category,
  description: "Warp someone's avatar!",
  usage: 'warp (@ mention)',
  example: 'warp @William Zhou#0001',
  perm: [['global.fun.image.warp']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][warp] Build objects complete!');
module.exports = [
  [warp.name, warp],
];
