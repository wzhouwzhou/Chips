module.exports = {
  name: "channelcount",
  async func(msg, { send, guild, channel }) {
    if(guild)
      return send(guild.channels.size);
    else return send('You must be in a server to use this!');
  }
};
