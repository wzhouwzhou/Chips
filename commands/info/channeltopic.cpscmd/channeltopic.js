const embed = new Discord.RichEmbed()
.addField(channel.topic, true);

module.exports = {
  name: "channeltopic",
  async func(msg, { send, channel, guild }) {
    if (!channel.topic)
      return send('Rip. No channel topic for you!')
    
    if(guild)
      return send({embed})
    else return send('You must be in a server to use this!');
  }
};
