module.exports = {
  name: "settopic",
  async func(msg, { send, guild, member, args, channel, suffix}) {
      if(author.id==='205608598233939970'==null&&!member.hasPermission("MANAGE_CHANNELS"))
        return send('You need `MANAGE_CHANNELS` permissions to use this command!')
      if(!guild)
        return;
      if(!suffix) 
        return send('Nothing provided to set as channel topic');
      if(suffix.length>1024)   
        return send('The channel topic can only be a maximum of 1024 characters in length!'); 
    
    let embed = (new Discord.MessageEmbed)
      .setTitle('Channel Topic')
      .setDescription(suffix)
      .setColor(member.displayColor);
      
      await channel.setTopic(suffix);
      return send(embed); 

   }
}
