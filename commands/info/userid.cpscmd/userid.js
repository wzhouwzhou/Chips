module.exports = {
    name: 'userid',
    async func(msg, { args, send, user, author }) {
       
        if(!args[0]) {
         return send(`${author.id}`);
        }

        if(args[0] && !args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
          return send(`Did you mention someone?`)
        }  
        
          if(args[0].match(/^[^]*<@!?(\d+)>[^]*$/)) {
            let targetUser = args[0].match(Constants.patterns.MENTION)[0]
            return send(`${targetUser.id}`);
        }  
        
    },
};           
