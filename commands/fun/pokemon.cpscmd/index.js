
let pokemontest = require('./pokemontest');
console.log('[CPSCMD][FUN][pokemon] Building objects...');

pokemontest.metadata = {
  category: require('../').category,
  description: 'A work in progress!',
  usage: 'pokemontest',
  example: 'pokemontest',
  perm: [['global.fun.pokemon.start']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][pokemon] Build objects complete!');
module.exports = [
  [pokemontest.name,pokemontest],
];
