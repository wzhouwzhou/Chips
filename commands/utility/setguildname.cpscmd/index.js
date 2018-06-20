const sgn = require('./setguildname');

console.log('[CPSCMD][UTILITY][setguildname] Building objects...');

sgn.metadata = {
  category: require('../').category,
  description: 'Changes the server name.',
  usage: 'setguildname <new name>',
  example: 'setguildname My Server',
  perm: [['global.utility.setguild.name']],
  customperm: ['MANAGE_GUILD'],
};

console.log('[CPSCMD][UTILITY][setguildname] Build objects complete!');
module.exports = [
  [sgn.name, sgn],
  ['sgn', sgn],
  ['setservername', sgn],
  ['setgname', sgn],
];
