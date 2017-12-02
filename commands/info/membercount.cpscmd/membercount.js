module.exports = {
  name: 'membercount',
  async func(msg, { send, guild, role }) {
    if (guild) {
      let trueMemC = role.members.filter(member => !member.user.bot);
      return send(`**${guild.members.size - trueMemC.size === 1 ? 'bot' : 'bots'}** members are in **${guild.name}**!`);
    } else {
      return send('You must be in a server to use this!');
    }
  },
};
