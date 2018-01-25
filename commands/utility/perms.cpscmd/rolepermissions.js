const _ = require('lodash');

const cb = '`'.repeat(3), start = `${cb}diff`;

module.exports = {
  name: 'rolepermissions',
  func(msg, { send, channel, guild, suffix, Discord, Constants }) {
    const theChannel = msg.mentions.channels.first() || channel;
    const tomatch = _.escapeRegExp(suffix.replace(theChannel + [], '').trim());
    const theRole = msg.mentions.roles.first() ||
      guild.roles.get(tomatch.replace(/\s+/g, '') || '0') ||
      Array.from(guild.roles.values())
        .filter(r => r.name.match(new RegExp(tomatch, 'i')))[0];

    if (!theRole) return send('You must mention a role, or provide a valid roleid or full role name.');

    let beautified = [], deny = [];
    beautified.push(start);
    deny.push(start);
    let pobj = theRole.permissions.serialize();
    let adminrole = false;
    const { permissions_details } = Constants;
    for (const p in pobj) {
      let action;
      if (pobj[p]) {
        action = '+Can';
        if (action === '+Can' && p === 'ADMINISTRATOR') {
          beautified = [start];
          beautified.push('+ (Admin) Role has all perms but people in it cannot necessarily delete the server');
          adminrole = true;
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
      .setTitle(theRole.name)
      .setColor(theRole.color || 1234972)
      .addField(!adminrole ? 'can...' : 'OP',
        beautified.join('\n'));
    if (!adminrole) embed.addField('cannot...', deny.join('\n'));

    return send('Role permissions:', { embed });
  },
};
