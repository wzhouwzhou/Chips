
let invite = require('./invite');

console.log('[CPSCMD][INFO][invite] Building objects...');

invite.metadata = {
  category: require('../').category,
  description: 'Gives Chips\' invite code',
  usage: 'invite',
  example: 'invite',
  perm: [['public.info.invite.invite']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][invite] Build objects complete!');
module.exports = [
  [invite.name,invite]
];
