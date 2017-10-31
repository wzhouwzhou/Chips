module.exports = {
    name: 'channels',
    async func(msg, { send, guild, member }) {
        if (guild) {
        const text = guild.channels.filter(c => c.type === 'text')
          return send((new Discord.MessageEmbed).setDescription(guild.channels.array(text).map(e => e + []).join(' ')).setTitle(`${guild.channels.size} channels!`)
          .setColor(member.displayColor));
      } else { return 'You need to be in a server to use this command!'; }
    },
  };
  