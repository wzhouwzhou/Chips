module.exports = {
  name: 'servername',
  func(msg, { send, guild }) {
    if (!guild) {
      return send('You must be in a server to use this');
    } else {
      return send(guild.name);
    }
  },
};
