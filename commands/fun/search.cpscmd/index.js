let lmgtfy = require('./lmgtfy');
console.log('[CPSCMD][FUN][lmgtfy] Building objects...');

lmgtfy.metadata = {
  category: require('../').category,
  description: 'A searching tool!',
  usage: 'lmgtfy [searchengine] [message content]',
  example: 'lmgtfy google hi',
  perm: [['global.fun.search.lmgtfy']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][FUN][lmgtfy] Build objects complete!');
module.exports = [
  [lmgtfy.name, lmgtfy],
];
