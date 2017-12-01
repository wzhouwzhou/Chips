module.exports = {
  name: 'membercount',
  async func(msg, { send, guild }) {
    if (guild) {
      return send(`**${guild.members.size}** members are in **${guild.name}**!`);
    } else {
      return send('You must be in a server to use this!');
    }
  },
};
