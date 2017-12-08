const _ = require('lodash');

const cb = '`'.repeat(3), start = `${cb}diff`;

module.exports = {
  name: 'permissionsin',
  func(msg, { args, send, channel, guild, suffix, Discord, member, Constants }) {
    const theMember = args[0] ?
      guild.members.get(args[0] || '0') ||
      Array.from(guild.members.values())
        .filter(m => m.user.tag.match(new RegExp(_.escapeRegExp(suffix), 'i')))[0] :
      member;

    if (!theMember) return send('You must provide a valid userid or Discord tag.');

    let beautified = [], deny = [];
    beautified.push(start);
    deny.push(start);
    let pobj = channel.permissionsFor(theMember).serialize();
    let adminuser = false;
    const { permissions_details } = Constants;
    for (const p in pobj) {
      let action;
      if (pobj[p]) {
        action = '+Can';
        if (action === '+Can' && p === 'ADMINISTRATOR') {
          beautified = [start];
          if (theMember.id === theMember.guild.ownerID) {
            beautified.push('+ (Owner) Member has all perms, and can delete the server');
          } else {
            beautified.push('+ (Admin) Member has all perms but cannot delete the server');
          }
          adminuser = true;
          break;
        }
        beautified.push(`+ ${permissions_details.get(p) || p}`);
      } else {
        action = '-Cannot';
        deny.push(`- ${permissions_details.get(p) || p}`);
      }
    }
    beautified.push(cb);
    deny.push(cb);
    const embed = new Discord.MessageEmbed()
      .setTitle(theMember.user.tag)
      .setColor(theMember.displayColor)
      .addField(!adminuser ? 'can...' : 'OP',
        beautified.join('\n'));
    if (!adminuser) embed.addField('cannot...', deny.join('\n'));

    return send('Channel specific permissions:', { embed });
  },
};
