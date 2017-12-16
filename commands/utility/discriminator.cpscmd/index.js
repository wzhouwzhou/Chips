/* eslint no-console: 'off' */
let discriminator = require('./discriminator');

console.log('[CPSCMD][FUN][discriminator] Building objects...');
discriminator.metadata = {
  category: require('../').category,
  description: 'discriminator!',
  usage: 'discriminator <discrim>',
  example: 'discriminator 1234',
  perm: [['global.utility.*']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][discriminator] Build objects complete!');
module.exports = [
  [discriminator.name, discriminator],
  ['discrim', discriminator],
];
