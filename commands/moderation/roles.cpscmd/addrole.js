module.exports = {
  name: 'addrole',
  async func(msg, { send, guild, args, content, member }) {
    if (!guild) {
      return send('You cannot use this command in Direct Messages.');
    }
    if (args[0].match(/^[^]*<@!?(\d+)>[^]*$/) && args[1]) {
      let targetUser = msg.mentions.members.first();
      let targetRole = content.substring(content.indexOf(args[1]));
      let targetRoleSend = guild.roles.find('name', `${targetRole}`);
      if (!targetUser) {
        return send('Did you mention someone?');
      } else if (!targetRoleSend) {
        return send('Role doesn\'t exist!');
      } else if (member.highestRole.position < targetRoleSend.position) {
        return send(`${targetRoleSend} is above your highest role!`);
      } else {
        await targetUser.addRole(guild.roles.find('name', `${targetRole}`));
        return send(`**Succesfully gave ${targetRoleSend} to ${targetUser + []}!**`);
      }
    }
  },
};
