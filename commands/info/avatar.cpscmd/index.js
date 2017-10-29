let avatar = require('./avatar');

console.log('[CPSCMD][INFO][avatar] Building objects...');
avatar.metadata = {
  category: require('../').category,
  description: 'This shows avatars of users!',
  usage: 'avatar [mention user]',
  example: 'avatar @Evildeathpro#7553',
  perm: [['global.info.avatar']],
  customperm: ['SEND_MESSAGES'],
};
console.log('[CPSCMD][INFO][avatar] Build objects complete!');
module.exports = [
  [avatar.name, avatar],
];
