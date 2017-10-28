let quote = require('./quote');

console.log('[CPSCMD][INFO][quote] Building objects...');
quote.metadata = {
  category: require('../').category,
  description: 'Quotes a message from someone else in the current channel.',
  usage: 'quote <message id>',
  example: 'quote 1234567890',
  perm: [['global.info.quote.quote']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][quote] Build objects complete!');
module.exports = [
  [quote.name, quote],
];
