let contact = require('./contact');

console.log('[CPSCMD][UTILITY][contact] Building objects...');

contact.metadata = {
  category: require('../').category,
  description: 'N/A',
  usage: 'N/A',
  example: 'N/A',
  perm: [['global.utility.*']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][UTILITY][contact] Build objects complete!');
module.exports = [
  [contact.name, contact],
];  