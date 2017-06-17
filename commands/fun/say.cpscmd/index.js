
let s = require('./s');
console.log('[CPSCMD][FUN][say] Building objects...');

s.metadata = {
  category: require('../').category,
  description: 'This command lets you say something through Chips!',
  usage: 's <message>',
  example: 's I will eat my creators one day!',
  perm: [['global.fun.say.say']],
};

console.log('[CPSCMD][FUN][say] Build objects complete!');
module.exports = [
  [s.name,s],
];
