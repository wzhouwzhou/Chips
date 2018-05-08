/* eslint no-console: 'off' */
let discrim = require('./discrim');

console.log('[CPSCMD][FUN][discrim] Building objects...');
discrim.metadata = {
  category: require('../').category,
  description: 'discriminator!',
  usage: 'discriminator <discrim>',
  example: 'discriminator 1234',
  perm: [['global.utility.*']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][discriminator] Build objects complete!');
module.exports = [
  [discrim.name, discrim],
  ['discriminator', discrim],
];
