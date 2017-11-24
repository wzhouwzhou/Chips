module.exports = {
    name: 'userid',
    async func(msg, { args, send, user, author, reply, gMember, guild }) {
       
        if(!args[0]) {
         return send(`${author.id}`);
        }

        if(args[0] && !args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
          return send(`Did you mention someone?`)
        }  
        
          if(args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
            let targetUser;
            try {
              const target = args[1].match(Constants.patterns.MENTION)[1];
              const user = gMember(target).user;
              targetUser = guild.members.get(user.id);
              console.log(`[USERID](FETCH) :${targetUser}`);
            } catch (err) {
              return reply(`Invalid user specified`);
            } 
          return send(`${targetUser}`);
        }  
        
    },
};           
