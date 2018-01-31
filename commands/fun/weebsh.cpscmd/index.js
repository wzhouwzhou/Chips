/* eslint no-console: 'off' */
const hug = require('./hug');
const kiss = require('./kiss');
const slap = require('./slap');
console.log('[CPSCMD][FUN][weeb] Building objects...');
hug.metadata = {
  category: require('../').category,
  description: 'Hug someone!',
  usage: 'hug (@ mention)',
  example: 'hug @William Zhou',
  perm: [['global.fun.weeb.hug']],
};
kiss.metadata = {
  category: require('../').category,
  description: 'Kiss someone!',
  usage: 'kiss (@ mention)',
  example: 'kiss @William Zhou',
  perm: [['global.fun.weeb.kiss']],
};
slap.metadata = {
  category: require('../').category,
  description: 'Slap someone!',
  usage: 'slap (@ mention)',
  example: 'slap @William Zhou',
  perm: [['global.fun.weeb.slap']],
};
tickle.metadata = {
  category: require('../').category,
  description: 'Give someone a tickle!',
  usage: 'tickle (@ mention)',
  example: 'slap @William Zhou',
  perm: [['global.fun.weeb.tickle']],
}
console.log('[CPSCMD][FUN][weeb] Build objects complete!');
module.exports = [
  [hug.name, hug],
  [kiss.name, kiss],
  [slap.name, slap],
  [tickle.name, tickle],
];
