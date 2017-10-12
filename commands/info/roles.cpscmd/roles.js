module.exports = {
    name: "roles",
    async func(msg, { send, guild, member, channel, member }) {
        if(!guild)
          return;
        if(guild)
          return member.send(new Discord.RichEmbed().setTitle('Role List').setDescription(guild._sortedRoles.map(e=>_.escapeRegExp(e.name)).reverse().join(', ')));
        
  
    }
}
