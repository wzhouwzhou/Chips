
let r = require('./roles');

console.log('[CPSCMD][INFO][ping] Building objects...');

r.metadata = {
  category: require('../').category,
  description: 'Lists all roles of a guild.',
  usage: 'roles',
  example: 'roles',
  perm: [['global.info.info']],
  cusomperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][ping] Build objects complete!');
module.exports = [
  [r.name,r],
  ['rolelist', r],
  ['roles', r],
  ['allroles', r],
  ['allrolelist', r],
];
