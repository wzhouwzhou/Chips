module.exports = {
  name: 'channelname',
  async func(msg, { send, guild, channel }) {
    if (guild) { return send(channel.name); } else { return send('You must be in a server to use this!'); }
  },
};