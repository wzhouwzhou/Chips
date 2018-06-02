module.exports = {
  name: 'membercount',
  async func(msg, { send, guild }) {
    if (guild) {
      let trueMemC = guild.members.filter(member => member.user.bot);
      return send(`**${guild.members.size - trueMemC.size}** humans and **${trueMemC.size} bots** are in **${guild.name}**!`, { mentionEveryone: false });
    } else {
      return send('You must be in a server to use this!');
    }
  },
};
