let chess = require('./chess');

console.log('[CPSCMD][FUN][chess] Building objects...');
chess.metadata = {
  category: require('../').category,
  description: 'Play some chess!',
  usage: 'chess',
  example: 'chess',
  perm: [['global.games.chess.play']],
};

console.log('[CPSCMD][FUN][chess] Build objects complete!');
module.exports = [
  [chess.name, chess],
];
