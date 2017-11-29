module.exports = {
  name: 'devaddrole',
  async func(msg, { send, guild, author, args, content, member, Discord }) {
    if (author.id === '205608598233939970') {
      if (!guild) {
        return send('You cannot use this command in Direct Messages.');
      } if (!args[0]) {
        return send('Role? Mention?');
      } if (!args[1]) {
        return send('Role?');
      } if (args[0].match(/^[^]*<@!?(\d+)>[^]*$/) && args[1]) {
        let targetUser = msg.mentions.members.first();
        let targetRole = content.substring(content.indexOf(args[1]));
        let targetRoleSend = guild.roles.find('name', `${targetRole}`);
        await targetUser.addRole(guild.roles.find('name', `${targetRole}`));
        return send(new Discord.MessageEmbed().setColor(member.displayColor).setDescription(`**Succesfully gave** <@&${targetRoleSend.id}> || **${targetRole}** **to** <@${targetUser.id}> || ${targetUser.username}`));
      }
    }
  },
};
