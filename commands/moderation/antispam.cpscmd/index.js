
let filter = require('./-blacklist');

console.log('[CPSCMD][MODERATION][antispam] Building objects...');
filter.metadata = {
  category: require('../').category,
  description: 'This command lets you "filter" certain keywords and manage the antispam filter in your server!',
  usage: '-blacklist <word(s)>',
  example: '-blacklist spammy content',
  perm: [['global.moderation.antispam.filter','global.moderation.antispam.blacklist']],
  customperm: ['BAN_MEMBERS'],
};

console.log('[CPSCMD][MODERATION][antispam] Build objects complete!');
module.exports = [
  [filter.name, filter],
];
