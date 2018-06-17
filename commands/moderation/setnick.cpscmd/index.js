let sn = require('./setnick');

console.log('[CPSCMD][MODERATION][setnick] Building objects...');
sn.metadata = {
  category: require('../').category,
  description: 'Changes member\'s nicknames!',
  usage: 'setnick',
  example: 'setnick',
  perm: [['global.moderation.setnick.*']],
  customperm: ['MANAGE_NICKNAMES'],
};


console.log('[CPSCMD][MODERATION][setnick] Build objects complete!');
module.exports = [
  [sn.name, sn],
  ['setnick', sn],
];
