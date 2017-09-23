module.exports = {
  name: "channelcount",
  async func(msg, { send, guild, channel, args }) {
    if(!guild)
      return send('You must be in a server to use this!');    
    
    if (!args[0]==='text') 
      return send(guild.channel.size);
    
    if (!args[0]==='voice') 
      return send(guild.voiceChannel.size); 

    if (!args[0]) 
      return send(guild.channel.size);     

  }
};
