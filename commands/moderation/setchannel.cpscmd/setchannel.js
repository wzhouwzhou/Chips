const top = args.slice(1).join(" ");
const nam = args.slice(1).join(" ");

const embed = (new Discord.RichEmbed)
  .setTitle('Help')
  .setDescription('All commands for \"setchannel\" are coming soon!')
  .setColor(member.displayColor);

module.exports = {
    name: "setchannel",
    async func(msg, { send, guild, args, member, author }) {
      
      if(!author.id==='205608598233939970')
        return send('only lucas can aboose lmao');
      
      if(!guild)
        return send('You must be in a server to use this');

      if (!args[0])
        return send(embed);
  
      if (args[0]==='help')
        return send(embed);
      
      if (args[0]==='name')
        if (args[1]<100||args[1]>2)
          return channel.setName(nam)
        if (args[1]<100||args[1]>2) 
          return send('Name stuff...');
  
      if (args[0]==='topic')
        if (args[1]&&args[1].length<1024)
          return channel.setTopic(top)
        if (!args[1]&&args[1].length<1024)
          return send('Topic stuff..');
    }
  
};
