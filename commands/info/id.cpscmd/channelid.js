module.exports = {
  name: 'channelid',
  func(msg, { send, channel, guild }) {
    if (guild) {
      return send(`${channel + []}`);
    } else {
      return send('You must be in a server to use this!');
    }
  },
};
