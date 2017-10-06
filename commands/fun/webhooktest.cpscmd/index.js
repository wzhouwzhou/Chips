
let wht = require('./webhooktest');

console.log('[CPSCMD][INFO][avatar] Building objects...');
wht.metadata = {
  category: require('../').category,
  description: 'Test.',
  usage: 'no usage m8',
  example: 'i said no',
  perm: [['global.info.info']],
  customperm: ['SEND_MESSAGES'],
};


console.log('[CPSCMD][INFO][avatar] Build objects complete!');
module.exports = [
  [wht.name,wht],
  ['wht', wht],
];