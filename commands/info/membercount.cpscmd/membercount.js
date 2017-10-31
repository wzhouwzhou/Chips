module.exports = {
  name: 'membercount',
  async func(msg, { send, guild }) {
    if (guild) { return send(guild.members.size); } else { return send('You must be in a server to use this!'); }
  },
};
