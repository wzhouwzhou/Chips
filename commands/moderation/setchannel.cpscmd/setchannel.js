
module.exports = {
    name: "setchannel",
    async func(msg, { send, guild, args, member, channel, suffix }) {

      if(!guild)
        return send('You must be in a server to use this');

      if (!args[0] || args[0]==='help'){
        const embed = new Discord.MessageEmbed()
          .setTitle('Help')
          .setDescription('All commands for "setchannel" are coming soon!')
          .setColor(member.displayColor);
        return send(embed);
      }

      if (args[0]==='name')
        if(!args[1])
          return send('No name given to set');
        else if(!suffix.substring(suffix.indexOf(args[1])).match(/^[0-9a-z\-_]+$/i))
          return send('Text channel name must be alphanumeric with dashes or underscores.');
        else
          return await channel.setName(suffix.substring(suffix.indexOf(args[1])));

      if (args[0]==='topic')
        if(!args[1])
          return send('No topic given to set');
        else
          return await channel.setTopic(suffix.substring(suffix.indexOf(args[1])));
    }
};
