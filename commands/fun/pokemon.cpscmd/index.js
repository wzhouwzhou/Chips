
let pokemon = require('./pokemon');
console.log('[CPSCMD][FUN][pokemon] Building objects...');

pokemon.metadata = {
  category: require('../').category,
  description: 'A work in progress!',
  usage: 'pokemon',
  example: 'pokemone',
  perm: [['global.fun.pokemon.start']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][pokemon] Build objects complete!');
module.exports = [
  [pokemon.name,pokemon],
];
