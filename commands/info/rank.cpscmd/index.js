
let mee6 = require('./mee6rank');

console.log('[CPSCMD][INFO][rank] Building objects...');
mee6.metadata = {
  category: require('../').category,
  description: 'Fetches mee6rank.',
  usage: 'mee6rank',
  example: 'mee6rank',
  perm: [["global.info.rank.mee6"]],
  customperm: ["SEND_MESSAGES"],
};

console.log('[CPSCMD][INFO][rank] Build objects complete!');
module.exports = [
  [mee6.name,mee6]
];
