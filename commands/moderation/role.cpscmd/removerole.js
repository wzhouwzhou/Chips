module.exports = {
    name: 'removerole',
    async func(msg, { send, guild, member, author, args, content }) {
      
    if(author.id === '205608598233939970') {
      if(!args[0]) {
        return send('Role? Mention?')
      }
      if(!args[1]) {
        return send('Role?')
      }
      if(args[0].match(/^[^]*<@!?(\d+)>[^]*$/) && args[1]) {
        let targetUser = msg.mentions.members.first() 
        let targetRole = content.substring(content.indexOf(args[1]));
        await targetUser.removeRole(guild.roles.find('name', `${targetRole}`))
        return send(`Gucci.`);

      } 
    }    
  },
};