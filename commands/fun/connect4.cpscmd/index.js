
let con4 = require('./con4');

console.log('[CPSCMD][FUN][con4] Building objects...');
con4.metadata = {
  category: require('../').category,
  description: 'Play some connect four!',
  usage: 'con4',
  example: 'con4',
  perm: [["global.games.con4.play"]],
};

console.log('[CPSCMD][FUN][con4] Build objects complete!');
module.exports = [
  [con4.name,con4]
];
