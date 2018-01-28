/* eslint no-console: 'off' */
let outage = require('./outage');

console.log('[CPSCMD][FUN][outage] Building objects...');
outage.metadata = {
  category: require('../').category,
  description: 'Outage!',
  usage: 'outage',
  example: 'outage ',
  perm: [['global.fun.*']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][outage] Build objects complete!');
module.exports = [
  [outage.name, outage],
];
