module.exports = {
  name: "nR",
  perm:["custom.nr"],
  async func(msg, { send, member, author, channel, args, reply, Discord }) {
    const used = member || author;
    if(!used.hasPermission("BAN_MEMBERS")){
      switch (used.id) {
        case Constants.users.WILLYZ:
        case Constants.users.PGSUPER:
        case Constants.users.ZALGO:
        case Constants.users.XZLQ:
        case Constants.users.KONEKO:
        case Constants.users.NELYN:
        case Constants.users.LOAF:
        case Constants.users.ARX:
        case Constants.users.GOTEM:
          break;
        default:
          return;
      }
    }
    if (!args[0]) return send("No user given :(");

    let us;
    try{  //try find by mention
      us=args[0].match(Constants.patterns.MENTION)[1];
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
    let bad =(new Discord.MessageEmbed());
    if(c3.guilds.get(serv).members.get(us)==null)
      return reply(`No roles for: \`\`${args[0]}\`\`! (Probably not in target guild/server).`);
    c3.guilds.get(serv).members.get(us).roles.forEach(function(item){
      bad.setColor(200).setTitle(`Role lookup for ${c3.guilds.get(serv).members.get(us).user.username}: ${us}`);
      bad.addField(`role match ${num}:`,item.name); i++;num++;
      if(i==24) {
        channel.send(' ', {embed: bad});
        bad =(new Discord.MessageEmbed());
        i=0;
      }
    });
    channel.send(' ',{embed: bad});
    channel.send(`${--num} roles`);
  }
};
