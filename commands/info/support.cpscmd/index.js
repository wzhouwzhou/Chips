
let support = require('./support');

console.log('[CPSCMD][INFO][support] Building objects...');
support.metadata = {
  category: require('../').category,
  description: "Links Chips' support server!",
  usage: 'support',
  example: 'support',
  perm: [['public.info.support.support']],
  customperm: ['SEND_MESSAGES']
};

console.log('[CPSCMD][INFO][support] Build objects complete!');
module.exports = [
  [support.name,support]
];
