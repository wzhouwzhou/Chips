
let invite = require('./invite');

console.log('[CPSCMD][INFO][invite] Building objects...');
invite.category = require('../').category;

invite.description = 'Gives Chips\' invite code';

invite.usage = 'invite';

invite.example = 'invite';

console.log('[CPSCMD][INFO][invite] Build objects complete!');
module.exports = [
  [invite.name,invite]
];
