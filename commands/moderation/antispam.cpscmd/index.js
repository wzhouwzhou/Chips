
let blacklist = require('./blacklist');
console.log('[CPSCMD][MODERATION][antispam] Building objects...');
blacklist.category = require('../').category;

blacklist.description = 'This command lets you "blacklist" certain keywords and manage the blacklist filter in your server!';

console.log('[CPSCMD][MODERATION][antispam] Build objects complete!');
module.exports = [
  [blacklist.name,blacklist],
];
