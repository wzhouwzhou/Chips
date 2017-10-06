module.exports = {
    name: "webhooktest",
    async func(msg, { send, guild, channel, author, args }) {

    const content = content.substr(content.indexOf(args[0]));    
    
    if (author.id == Constants.users.LUCAS)
      return;

  const lucas = guild.members.get('205608598233939970')?guild.members.get('205608598233939970').displayName:null;
    if(lucas)
      channel.createWebhook(lucas, Constants.avatars.LUCAS)
        .then (whook => whook.edit(lucas, Constants.avatars.LUCAS))
        .then(hook => hook.send(content)
        .then(() => { hook.delete(); })
        .catch(console.error)
  
     )
   }

};


