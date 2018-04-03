module.exports = {
  name: 'emojis',
  func(msg, { send, guild, member, Discord }) {
    if (!guild) return send('You need to be in a server to use this!');
    if (guild.emojis.size >= 1) {
      let desc = '', fields = [''], cur = fields.length - 1;
      const emojis = [...guild.emojis.filter(e => !e.animated).array(), ...guild.emojis.filter(e => e.animated).array()];
      for (const emoji of emojis) {
        if (`${desc} ${emoji + []}`.length < 2000) {
          desc += emoji + [];
        } else {
          if (!fields[cur]) fields[cur] = '';
          if (`${fields[cur]} ${emoji + []}`.length < 1000) {
            fields[cur] += emoji + [];
          } else {
            fields[++cur] = '';
            fields[cur] += emoji + [];
          }
        }
      }
      const embed = new Discord.MessageEmbed()
        .setDescription(desc)
        .setTitle(`${guild.emojis.size} emojis.`)
        .setColor(member.displayColor);
      for (const field of fields.filter(f => f && f.length > 0)) embed.addField('\u200B', field);
      return send(embed);
    }
    return send('The server doesn\'t have any emojis!');
  },
};
