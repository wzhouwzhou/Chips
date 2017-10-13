module.exports = {
    name: "setchannel",
    async func(msg, { send, guild, args, member }) {
      if(!guild)
        return send('You must be in a server to use this');
      const embed = (new Discord.RichEmbed)
        .setTitle('Help')
        .setDescription('All commands for \"setchannel\" are coming soon!')
        .setColor(member.displayColor);
  
      if (!args[0])
        await guild.fetchBans()
        return send(embed)
  
      if (args[0]==='help')
        return send(embed)
      
      if (args[0]==='name')
        if (args[1]>100||args[1]<2)
          return;
        if (args[1]<100||args[1]>2) 
          return send('Name stuff...') 
  
      if (args[0]==='topic')
        if (!args[1]&&args[1].length<1024)
          return;
        if (args[1]&&args[1].length<1024)
          return send('Topic stuff..') 
    }
  
  };