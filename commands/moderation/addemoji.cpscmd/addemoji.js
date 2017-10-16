//const emojiurl = args[1].match(/^(https?\:\/\/[^.]+\.[^]+)$/)[1]  

module.exports = {
    name: "addemoji",
    async func(msg, { send, args, member, guild }) {
    
    if (!args[0]) 
      return reply("No emoji name given :(");   
      
    if(!member.hasPermission('MANAGE_EMOJIS'))
      return send('no');
    
    if (!args[0]) 
      return send("No emoji name given :(");   
    
    let name = args[0].toLowerCase();

    if(!args[1]) 
      return send('no url');

    if(!args[1].match(/^https?\:\/\/[^.]+\.[^]+$/)) 
      return send("ensure you've given a url");

    let url = args[0].toLowerCase();
    
    guild.createEmoji(url, name)
      .then(emoji => send(`Created new emoji with name ${emoji.name}!`))
      .catch(console.error);

    }
}   
