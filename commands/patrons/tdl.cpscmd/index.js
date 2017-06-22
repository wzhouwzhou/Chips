
let tdl = require('./tdl');
console.log('[CPSCMD][PATRONS][tdl] Building objects...');

tdl.metadata = {
  category: require('../').category,
  description: 'A custom cmd for our first patron!',
  usage: 'tdl',
  example: 'tdl',
  perm: [['public.info.support.support']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][UTILITY][perm] Build objects complete!');
module.exports = [
  [tdl.name,tdl],
];
