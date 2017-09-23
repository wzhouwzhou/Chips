module.exports = {
  name: "channelid",
  async func(msg, { send, channel, guild }) {
    if(guild)
      return send(channel.id);
    else return send('You must be in a server to use this!');
  }
};
