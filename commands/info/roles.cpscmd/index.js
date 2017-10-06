
let r = require('./roles');

console.log('[CPSCMD][INFO][avatar] Building objects...');
r.metadata = {
  category: require('../').category,
  description: 'This shows you all the roles',
  usage: 'roles',
  example: 'roles',
  perm: [['global.info.info']],
  customperm: ['SEND_MESSAGES'],
};


console.log('[CPSCMD][INFO][avatar] Build objects complete!');
module.exports = [
  [r.name,r],
  ['roles', r],
];