const time = require('./time');

console.log('[CPSCMD][UTILITY][time] Building objects...');
time.metadata = {
  category: require('../').category,
  description: 'Fetches times.',
  usage: 'time (location)',
  example: 'time United Kingdom',
  perm: [['global.utility.time.fetch']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][UTILITY][time] Build objects complete!');
module.exports = [
  [time.name, time],
];
