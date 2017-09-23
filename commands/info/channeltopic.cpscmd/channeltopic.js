module.exports = {
  name: "channeltopic",
  async func(msg, { send, channel, guild }) {
    if(guild)
      return send(channel.topic);
    else return send('You must be in a server to use this!');
  }
};
