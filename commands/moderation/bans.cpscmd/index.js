
let ban = require('./ban');
let hackban = require('./hackban');
let reactban = require('./reactban');
let unban = require('./unban');
let softban = require('./softban')
let roleban = {};
console.log('[CPSCMD][MODERATION][ban] Building objects...');

ban.metadata = {
  category: require('../').category,
  description: 'This command lets you ban server members!',
  usage: 'ban <User> <Optional Reason>',
  example: 'ban @周珺 • WillyZ#6686 Being dumb.',
  perm: [['global.moderation.bans.ban']],
  customperm: ['BAN_MEMBERS'],
};
hackban.metadata = {
  category: require('../').category,
  description: 'This command lets you ban people by ID, so they don\'t have to be server members!',
  usage: 'hackban <UserID> <Optional Reason>',
  example: 'hackban 1234567890 Being a skrub!',
  perm: [['global.moderation.bans.hackban']],
  customperm: ['BAN_MEMBERS'],
};
reactban.metadata = {
  category: require('../').category,
  description: 'This command lets you ban people from adding reactions!',
  usage: 'reactban <User>',
  example: 'reactban @JohnSmith#0000',
  perm: [['global.moderation.bans.reactban']],
  customperm: ['BAN_MEMBERS'],
};
unban.metadata = {
  category: require('../').category,
  description: 'This command lets you unban server members!',
  usage: 'unban <User> <Optional Reason>',
  example: 'unban @周珺 • WillyZ#6686 Being dumb.',
  perm: [['global.moderation.bans.ban']],
  customperm: ['BAN_MEMBERS'],
};
roleban.metadata = {
  category: require('../').category,
  description: 'This command lets you ban people from having a certain role!',
  usage: 'roleban <User> <Role Name, ID, or Mention>',
  example: 'role @JohnSmith#0000 SomeRole',
  perm: [['global.moderation.bans.roleban']],
  customperm: ['BAN_MEMBERS'],
};
softban.metadata = {
  category: require('../').category,
  description: 'This command lets you ban people and instantly unban members!',
  usage: 'softban <User> <Optional reason>',
  example: 'softban @JohnSmith#0000 You got banned!',
  perm: [['global.moderation.bans.ban']],
  customperm: ['BAN_MEMBERS'],
};
console.log('[CPSCMD][MODERATION][ban] Build objects complete!');
module.exports = [
  [ban.name,ban],
  [hackban.name,hackban],
  [unban.name,unban],
  [softban.name,softban]
];
