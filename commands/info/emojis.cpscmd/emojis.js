module.exports = {
  name: 'emojis',
  async func(msg, { send, guild, member, Discord }) {
    if (guild && guild.emojis.size >= '1') {
      return send((new Discord.MessageEmbed)
        .setDescription(guild.emojis.array().map(e => e + []).join(' '))
        .setTitle(`${guild.emojis.size} emojis.`)
        .setColor(member.displayColor));
    } else if (guild.emojis.size < '1') {
      return send('The server doesn\'t have any emojis!');
    } else {
      return send('You need to be in a server to use this!');
    }
  },
};
