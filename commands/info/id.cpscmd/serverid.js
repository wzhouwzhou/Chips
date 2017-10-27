module.exports = {
  name: 'serverid',
  async func(msg, { send, guild }) {
    if (guild) { return send(guild.id); } else { return send('You must be in a server to use this!'); }
  },
};
