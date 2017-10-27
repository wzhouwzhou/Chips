const replacersht = new Map()
  .set('CREATE_INSTANT_INVITE', 'create their own invite link')
  .set('KICK_MEMBERS', 'kick members from here')
  .set('BAN_MEMBERS', 'ban members here')
  .set('ADMINISTRATOR', 'perform administrative actions here')
  .set('MANAGE_CHANNELS', 'edit channel settings')
  .set('MANAGE_GUILD', 'edit server settings')
  .set('ADD_REACTIONS', 'react to messages')
  .set('VIEW_AUDIT_LOG', 'see the audit logs')
  .set('READ_MESSAGES', 'read messages in this server')
  .set('SEND_MESSAGES', 'send messages here')
  .set('SEND_TTS_MESSAGES', 'send text-to-speech messages')
  .set('MANAGE_MESSAGES', 'delete messages and reactions')
  .set('EMBED_LINKS', 'send embedded content')
  .set('ATTACH_FILES', 'upload files and photos')
  .set('READ_MESSAGE_HISTORY', 'read message history')
  .set('MENTION_EVERYONE', 'mention everyone')
  .set('USE_EXTERNAL_EMOJIS', 'use emojis from other servers')
  .set('CONNECT', 'connect to a voice channel')
  .set('SPEAK', 'talk in voice channels')
  .set('MUTE_MEMBERS', 'mute members in voice channels')
  .set('DEAFEN_MEMBERS', 'deafen members in voice channels')
  .set('MOVE_MEMBERS', 'move members to other voice channels')
  .set('USE_VAD', 'use voice activity detection')
  .set('CHANGE_NICKNAME', 'change their nickname')
  .set('MANAGE_NICKNAMES', "change someone else's nickname")
  .set('MANAGE_ROLES', 'modify role settings')
  .set('MANAGE_WEBHOOKS', 'manage webhooks')
  .set('MANAGE_EMOJIS', 'manage server-wide emotes');

const cb = '```', themember = member;
let beautified = [], deniedpleb = [];
beautified.push(`${cb}diff`);
deniedpleb.push(`${cb}diff`);
let pobj = channel.permissionsFor(themember).serialize();
let adminuser = false;
for (p of Object.keys(pobj)) {
  let action;
  if (pobj[p]) {
    action = '+Can';
    if (action == '+Can' && p == 'ADMINISTRATOR') {
      beautified = [`${cb}diff`];
      if (themember.id == themember.guild.ownerID) beautified.push('+ (Owner) Member has all perms, and can delete the server');
      else beautified.push('+ (Admin) Member has all perms but cannot delete the server');
      adminuser = true;
      break;
    }
    beautified.push(`+ ${replacersht.get(p)}` || p);
  } else {
    action = '-Cannot';
    deniedpleb.push(`- ${replacersht.get(p)}` || p);
  }
}
beautified.push(cb);
deniedpleb.push(cb);
let embed = new Discord.MessageEmbed()
  .setTitle(themember.user.tag)
  .setColor(member.displayColor)
  .addField('can...', beautified.join('\n'));
if (!adminuser) embed.addField('cannot...', deniedpleb.join('\n'));

send('', { embed });
