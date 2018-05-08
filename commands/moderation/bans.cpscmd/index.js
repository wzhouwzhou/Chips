let ban = require('./ban');
let hackban = require('./hackban');
let instaban = require('./instaban');
let reactban = require('./reactban');
let unban = require('./unban');
let softban = require('./softban');

console.log('[CPSCMD][MODERATION][ban] Building objects...');
let cmds = [ban, hackban, instaban, reactban, unban, softban];
cmds.forEach(cmd => {
  cmd.metadata = {};
  cmd.metadata.category = require('../').category;
  cmd.metadata.customperm = ['BAN_MEMBERS'];
});

ban.metadata.description = 'This command lets you ban server members!';
hackban.metadata.description = 'This command lets you ban people by ID, so they don\'t have to be server members!';
instaban.metadata.description = 'This command lets you instanly ban server members!';
reactban.metadata.description = 'This command lets you ban people from adding reactions!';
unban.metadata.description = 'This command lets you unban server members';
softban.metadata.description = 'This command lets you ban people and instanly unban them!';

ban.metadata.usage = 'ban <User> <Optional Reason>';
hackban.metadata.usage = 'hackban <ID> <Optional Reason>';
instaban.metadata.usage = 'instaban <User> <Optional Reason>';
reactban.metadata.usage = 'reactban <User> <Optional Reason>';
unban.metadata.usage = 'unban <User> <Optional Reason>';
softban.metadata.usage = 'softban <User> <Optional Reason>';

ban.metadata.example = 'ban @LucasLSG#0260 Raiding';
hackban.metadata.example = 'hackban 205608598233939970 Raiding';
instaban.metadata.example = 'instaban @LucasLSG#0260 Raiding';
reactban.metadata.example = 'reactban @LucasLSG#0260 Raiding';
unban.metadata.example = "unban @LucasLSG#0260 Didn't raid!";
softban.metadata.example = 'softban @LucasLSG#0260 Raiding';

ban.metadata.perm = [['global.moderation.bans.ban']];
hackban.metadata.perm = [['global.moderation.bans.hackban']];
instaban.metadata.perm = [['global.moderation.bans.instaban']];
reactban.metadata.perm = [['global.moderation.bans.reactban']];
unban.metadata.perm = [['global.moderation.bans.unban']];
softban.metadata.perm = [['global.moderation.bans.softban']];

console.log('[CPSCMD][MODERATION][ban] Build objects complete!');
module.exports = [
  [ban.name, ban],
  [hackban.name, hackban],
  ['hban', hackban],
  ['forceban', hackban],
  ['fban', hackban],
  [instaban.name, instaban],
  ['iban', instaban],
  [unban.name, unban],
  ['uban', unban],
  [softban.name, softban],
  ['sban', softban],
];
