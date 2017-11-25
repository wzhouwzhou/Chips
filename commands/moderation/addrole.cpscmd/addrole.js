module.exports = {
    name: 'addrole',
    async func(msg, { send, guild, member }) {
      
    if(author.id = '205608598233939970')  
      
      if(!args[0]) {
          return send('Role? Mention?')
      if(args[0].match(/^[^]*<@!?(\d+)>[^]*$/) && args[1]) {
        let targetUser;
        try {
          const target = args[0].match(/^[^]*<@!?(\d+)>[^]*$/);
          const User = gMember(target).user;
          targetUser = guild.members.get(User.id);
          console.log(`[ADDROLE](idkwhattoputhere) :${targetUser}`);
        } catch (err) {
          return reply(`Invalid user specified`);
        } 
        
        let targetRole = args[1];
        await targetUser.addRole(guild.roles.find('name', `${targetRole}`))
        return send(`Gucci.`);

      }   
    }
  },
};
  