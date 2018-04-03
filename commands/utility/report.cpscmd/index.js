let report = require('./report');

console.log('[CPSCMD][UTILITY][setchannel] Building objects...');

report.metadata = {
  category: require('../').category,
  description: 'N/A',
  usage: 'report',
  example: 'report',
  perm: [['global.utility.*']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][UTILITY][setchannel] Build objects complete!');
module.exports = [
  [report.name, report],
];
