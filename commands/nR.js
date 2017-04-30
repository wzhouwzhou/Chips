module.exports = {
  name: "nR",
  async func(msg, { send, member, author, content, channel, guild, args, gMember, Discord }) {
    const used = member || author;
    if(!used.hasPermission("ADMINISTRATOR")){
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
    const target = args[0];
    // console.log("Target: "+target);

    let us = target;
    let serv = Constants.servers.NEB;
    let num=0;
    let i=0;
    let bad =(new (require('discord.js')).RichEmbed());
    c3.guilds.get(serv).members.get(us).roles.forEach(function(item){
      bad.setColor(200).setTitle(`Role lookup for ${c3.guilds.get(serv).members.get(us).user.username}: ${us}`);
      bad.addField(`role match ${num}:`,item.name); i++;num++;
      if(i==24) {
        channel.sendEmbed(bad);
        bad =(new (require('discord.js')).RichEmbed());
        i=0;
      }
    });
    channel.sendEmbed(bad);
    channel.send(`${--num} roles`);
  }
};
