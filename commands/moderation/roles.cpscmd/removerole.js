module.exports = {
  name: 'removerole',
  async func(msg, { send, guild, args, content, member, Discord, author }) {
    // If (author.id === '205608598233939970') {
    // if (author.id === '166630166825664512' || '257973543537606659' || '205608598233939970') {
    if (author.id === '166630166825664512' && guild.id === '291558782755012610') {
      if (!guild) {
        return send('You cannot use this command in Direct Messages.');
      }

      if (!args[0].match(/^[^]*<@!?(\d+)>[^]*$/) && !args[1].match(/^[^]*<@!?(\d+)>[^]*$/)) {
        return send('Mention?');
      }

      if (!args[1]) {
        return send('Role?');
      }

      if (args[0].match(/^[^]*<@!?(\d+)>[^]*$/) && args[1]) {
        let targetUser = msg.mentions.members.first();
        let targetRole = content.substring(content.indexOf(args[1]));
        let targetRoleSend = guild.roles.find('name', `${targetRole}`);
        if (!targetUser) {
          return send('Mention?');
        }
        if (member.highestRole.position > targetRoleSend.position) {
          await targetUser.removeRole(guild.roles.find('name', `${targetRole}`));
          return send(new Discord.MessageEmbed()
            .setColor(member.displayColor)
            .setDescription(`**Succesfully removed** <@&${targetRoleSend.id}> || **${targetRole}** **to** <@${targetUser.id}> || ${targetUser.username}`));
        }
      }
    } else if (author.id === '205608598233939970') {
      let targetUser = msg.mentions.members.first();
      let targetRole = content.substring(content.indexOf(args[1]));
      let targetRoleSend = guild.roles.find('name', `${targetRole}`);
      await targetUser.removeRole(guild.roles.find('name', `${targetRole}`));
      return send(new Discord.MessageEmbed()
        .setColor(member.displayColor)
        .setDescription(`**Succesfully removed** <@&${targetRoleSend.id}> || **${targetRole}** **to** <@${targetUser.id}> || ${targetUser.username}`));
    } else {
      return send('You don\'t have enough permissions to use this command!');
    }
  },
};
