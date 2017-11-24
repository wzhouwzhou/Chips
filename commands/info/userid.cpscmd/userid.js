module.exports = {
    name: 'userid',
    async func(msg, { args, send, user }) {
       
        if(!args[0]) 
         return send(`${author.id}`);

        if(args[0] && !args[0].match(/^[^]*<@!?(\d+)>[^]*$/))
          return send(`Did you mention someone?`)
        
          if(args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) 
          let targetUser = msg.mentions.user.first() 
          return send(`${targetUser.id}`);
        
    },
};           
