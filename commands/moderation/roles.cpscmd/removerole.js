module.exports = {
  name: 'removerole',
  async func(msg, { send, guild, args, content, member }) {
    if (!guild) {
      return send('You cannot use this command in Direct Messages.');
    }
    if (!args[0] || !args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
      return send('No user mentioned');
    }
    if (!args[1]) {
      return send('No role name given');
    }

    let targetUser = msg.mentions.members.first();
    let targetRole = content.substring(content.indexOf(args[1]));
    let targetRoleSend = guild.roles.find('name', `${targetRole}`);
    if (!targetUser) {
      return send('Did you mention someone?');
    } else if (!targetRoleSend) {
      return send("Role doesn't exist!");
    } else if (member.highestRole.position < targetRoleSend.position) {
      return send(`${targetRoleSend.name.replace(/@/, '(at)')} is above your highest role!`);
    } else {
      await targetUser.removeRole(guild.roles.find('name', `${targetRole}`));
      return send(`**Succesfully removed ${targetRole.name.replace(/@/, '(at)')} from ${targetUser + []}!**`);
    }
  },
};
