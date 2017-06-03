
let ban = require('./ban');
let hackban = require('./hackban');

console.log('[CPSCMD][MODERATION][ban] Building objects...');
ban.category = require('../').category;
hackban.category = require('../').category;

ban.description = 'This command lets you ban server members!';
hackban.description = 'This command lets you ban people by ID, so they don\'t have to be server members!';

ban.usage = 'ban <User> <Reason>';
hackban.usage = 'hackban <UserID> <Reason>';

ban.example = 'ban @Chips#6673 He made an error!';
hackban.example = 'hackban 296855425255473154 Being a bot!';

console.log('[CPSCMD][MODERATION][ban] Build objects complete!');
module.exports = [
  [ban.name,ban],
  [hackban.name,hackban]
];
