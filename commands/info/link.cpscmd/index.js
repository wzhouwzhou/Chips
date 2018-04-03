const invite = require('./invite');
const website = require('./website');

console.log('[CPSCMD][INFO][invite] Building objects...');

invite.metadata = {
  category: require('../').category,
  description: 'Gives Chips\' invite code',
  usage: 'invite',
  example: 'invite',
  perm: [['public.info.link.invite']],
  customperm: ['SEND_MESSAGES'],
};

website.metadata = {
  category: require('../').category,
  description: 'Gives Chips\' website',
  usage: 'website',
  example: 'website',
  perm: [['public.info.link.website']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][INFO][invite] Build objects complete!');
module.exports = [
  [invite.name, invite],
  [website.name, website],
  ['site', website],
];
