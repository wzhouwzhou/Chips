const channeltopic = content.substr(content.indexOf(args[0]));

module.exports = {
  name: "settopic",
  async func(msg, { send, guild, member, args, channel }) {
      if(!member.hasPermission("MANAGE_CHANNELS"))
        return send('You need `MANAGE_CHANNELS` permissions!')
      if(!guild)
        return;
      if(!args[0]) 
        channel.setTopic(' ')
          .then(newChannel => send(`Channel's new topic is ${newChannel.topic}`))
          .catch(console.error); 
       if(args[0])
         channel.setTopic(channeltopic)
        .then(newChannel => send(`Channel's new topic is ${newChannel.topic}`))
        .catch(console.error);   
   }
}
