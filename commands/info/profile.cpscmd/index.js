let profile = require('./profile');

console.log('[CPSCMD][INFO][profile] Building objects...');
profile.metadata = {
  category: require('../').category,
  description: 'Gives profile for a user! (WIP)',
  usage: 'profile <no args>',
  example: 'profile',
  perm: [['global.info.profile.profile'], 'global.info.profile.profile.self', 'global.info.profile.profile.other'],
  customperm: ['SEND_MESSAGES'],
};

profile.example = 'profile';

console.log('[CPSCMD][INFO][profile] Build objects complete!');
module.exports = [
  [profile.name, profile],
];
