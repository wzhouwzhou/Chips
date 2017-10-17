module.exports = {
    name: "addemoji",
    async func(msg, { send, args, member, guild }) {

    if(!member.hasPermission('MANAGE_EMOJIS'))
      return send('no');
    
    const emojiurl = args[1].match(/^(https?\:\/\/[^.]+\.[^]+)$/)[1]    
    
    if (!args[0]) 
      return reply("No emoji name given :(");   
    
    let name = args[0];

    if(!args[1]) 
      return send('no url');

    if(!args[1].match(/^https?\:\/\/[^.]+\.[^]+$/)) 
      return send("ensure you've given a url");

    
    guild.createEmoji(emojiurl, name)
      .then(emoji => send(`Created new emoji with name ${emoji.name}!`))
      .catch(console.error);

    }
}   
