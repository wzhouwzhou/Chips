
let profile = require('./profile');

console.log('[CPSCMD][INFO][profile] Building objects...');
profile.category = require('../').category;

profile.description = 'Gives profile for a user! (WIP)';

profile.usage = 'profile <no args>';

profile.example = 'profile';

console.log('[CPSCMD][INFO][profile] Build objects complete!');
module.exports = [
  [profile.name,profile]
];
