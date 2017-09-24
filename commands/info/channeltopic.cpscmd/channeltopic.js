
module.exports = {
  name: "channeltopic",
  async func(msg, { send, channel, member, guild }) {
    if(!guild) return send('You must be in a server!');

    if (!channel.topic)
      return send('Rip. No channel topic for you!');

    const embed = (new Discord.RichEmbed)
      .setDescription(channel.topic)
      .setColor(member.displayColor);

    return send(embed);
  }
};
