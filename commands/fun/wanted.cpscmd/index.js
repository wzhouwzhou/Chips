/* eslint no-console: 'off' */
let wanted = require('./wanted');

console.log('[CPSCMD][FUN][wanted] Building objects...');
wanted.metadata = {
  category: require('../').category,
  description: 'Wanted!',
  usage: 'wanted',
  example: 'wanted ',
  perm: [['global.fun.*']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][wanted] Build objects complete!');
module.exports = [
  [wanted.name, wanted],
];
