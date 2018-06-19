module.exports = {
  name: 'rolecount',
  func(msg, { send, guild }) {
    if (guild) {
      return send(`${guild.roles.size} roles, ${guild.roles.filter(r => r.members.size === 0).size} unused.`);
    } else {
      return send('You must be in a server to use this!');
    }
  },
};
