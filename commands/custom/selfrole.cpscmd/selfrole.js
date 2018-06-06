module.exports = {
  name: 'selfrole',
  func(msg, { send, args, member, guild, content, author }) {
    let targetR = content.substring(content.indexOf(args[0]));
    let targetRole = guild.roles.find('name', `${targetR}`);

    if (~!'GiveawayNotify EventNotify XP Suspended'.split(/\s+/).indexOf(content.substring(content.indexOf(args[0])))) {
      return send('That isn\'t a selfrole!');
    }

    if (!guild.id === '274260111415836675') {
      return send();
    }
    if (member.roles.some(r => ['GiveawayNotify', 'EventNotify', 'XP Suspended'].includes(r.name))) {
      return send('You already have this role!');
    }

    if (targetRole) {
      send(`Succesfully gave <@!${author.id}> ${targetR}!`)
      return member.addRole(targetRole.id);
    }
  },
};
