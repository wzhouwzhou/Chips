let pokemon = require('./pokemon');
let pokemontest = require('./pokemontest');
console.log('[CPSCMD][FUN][pokemon] Building objects...');

pokemon.metadata = {
  category: require('../').category,
  description: 'A work in progress!',
  usage: 'pokemon [gen or "egg"] [possible egg?]',
  example: 'pokemon egg 3undisc',
  perm: [['global.fun.pokemon.start']],
  customperm: ['SEND_MESSAGES'],
};

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
  [pokemon.name, pokemon],
  [pokemontest.name, pokemontest],
];
