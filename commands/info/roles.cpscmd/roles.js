module.exports = {
  name: "roles",
  async func(msg, { send, guild, member }) {
    if(!guild)
      return send('You must be in a server to use this!');
    return send(new Discord.MessageEmbed().setColor(member.displayColor).setTitle(`Role List (${guild.roles.size})`).setDescription(guild._sortedRoles.map(e=>_.escapeRegExp(e.name)).reverse().join(', ')));
  }
};
