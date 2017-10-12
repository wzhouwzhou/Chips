module.exports = {
    name: "roles",
    async func(msg, { send, guild, member, user, channel, member }) {
        if(!guild)
          return;
        if(guild)
          return user.send(new Discord.RichEmbed().setColor(member.displayColor).setTitle('Role List').setDescription(guild._sortedRoles.map(e=>_.escapeRegExp(e.name)).reverse().join(', ')));
        }
}
