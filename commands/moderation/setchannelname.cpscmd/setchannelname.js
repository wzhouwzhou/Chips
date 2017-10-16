module.exports = {
    name: "setchannelname",
    async func(msg, { send, guild, member, args, channel, suffix, author }) {
        if(author.id==='205608598233939970'==null&&!member.hasPermission("MANAGE_CHANNELS"))
          return send('You need `MANAGE_CHANNELS` permissions to use this command!')
        if(!guild)
          return;
        if(!suffix) 
          return send('Nothing provided to set as channel name');
        if(suffix.length>100)   
          return send('The channel name can only be a maximum of 100 characters in length!');
        if(suffix.length<2)
          return send('The channel name can only be a minumum of 2 characters in length!');
      
      let embed = (new Discord.MessageEmbed)
        .setTitle('Channel Name')
        .setDescription(suffix)
        .setColor(member.displayColor);
        
        await channel.setName(suffix);
        return send(embed); 
  
     }
  }
