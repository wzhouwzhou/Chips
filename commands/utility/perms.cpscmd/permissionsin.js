const _ = require('lodash');

const cb = '`'.repeat(3), start = `${cb}diff`;

module.exports = {
  name: 'permissionsin',
  func(msg, { args, send, channel, guild, suffix, Discord, member, Constants }) {
    const theChannel = msg.mentions.channels.first() || channel;
    const tomatch = _.escapeRegExp(suffix.replace(theChannel + [], ''));
    const theMember = args[0] ?
      msg.mentions.members.first() ||
      guild.members.get(tomatch.replace(/\s+/g, '') || '0') ||
      Array.from(guild.members.values())
        .filter(m => m.user.tag.match(new RegExp(tomatch, 'i')))[0] :
      member;

    if (!theMember) return send('You must mention someone, or provide a valid userid or Discord tag.');

    let beautified = [], deny = [];
    beautified.push(start);
    deny.push(start);
    let pobj = theChannel.permissionsFor(theMember).serialize();
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

    return send(`Channel specific user permissions for ${theChannel + []}`, { embed });
  },
};
