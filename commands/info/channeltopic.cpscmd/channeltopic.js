const embed = new Discord.RichEmbed()
.addField(channel.topic, true);

module.exports = {
  name: "channeltopic",
  async func(msg, { send, channel, guild }) {
    if(guild)
      return send({embed})
    else return send('You must be in a server to use this!');
  }
};
