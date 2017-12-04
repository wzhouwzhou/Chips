let missing = require('./missing');

console.log('[CPSCMD][FUN][missing] Building objects...');
missing.metadata = {
  category: require('../').category,
  description: 'Missing!',
  usage: 'missing',
  example: 'missing ',
  perm: [['global.fun.*']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][missing] Build objects complete!');
module.exports = [
  [missing.name, missing],
];
