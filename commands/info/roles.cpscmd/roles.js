module.exports = {
    name: "roles",
    async func(msg, { send, guild, member, user, channel, member }) {
        if(!guild)
          return;
        if(guild)
          return user.send(new Discord.RichEmbed().setTitle('Role List').setColor(member.displayColor).setDescription(guild._sortedRoles.map(e=>_.escapeRegExp(e.name)).reverse().join(', ')));
        }
}
