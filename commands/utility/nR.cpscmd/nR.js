module.exports = {
  name: "nR",
  async func(msg, { send, channel, args, reply, Discord, getUser }) {
    if (!args[0]) return send("No user given :(");

    let us;
    try{  //try find by mention
      us=args[0].match(Constants.patterns.MENTION)[1];
      getUser(us);
      console.log("Target: "+us);
    }catch(err){
      console.log("mention failed...");
      //an id was specified:
      us = args[0];
      console.log("Target: "+us);
    }
    let serv = Constants.servers.NEB;
    let num=0;
    let i=0;
    let embed =(new Discord.RichEmbed());
    if(c3.guilds.get(serv).members.get(us)==null)
      return reply(`No roles found for: \`\`${args[0]}\`\`!`);
    c3.guilds.get(serv).members.get(us).roles.forEach(function(item){
      embed.setColor(200).setTitle(`Lookup for ${c3.guilds.get(serv).members.get(us).user.username}: ${us}`);
      embed.addField(`role match ${num}:`,item.name); i++;num++;
      if(i==24) {
        channel.send(' ', { embed });
        embed =(new Discord.RichEmbed());
        i=0;
      }
    });
    await send(`${--num} roles`,{ embed });
  }
};
