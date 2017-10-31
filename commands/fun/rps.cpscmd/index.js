let rps = require('./rockpaperscissors');

console.log('[CPSCMD][FUN][rps] Building objects...');
rps.metadata = {
  category: require('../').category,
  description: 'Play some rps vs the bot!',
  usage: 'rps',
  example: 'rps ',
  perm: [['global.games.rps.start']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][rps] Build objects complete!');
module.exports = [
  [rps.name, rps],
  ['rps', rps],
];
