const nEmpireID="297800479356878849";

module.exports = {
  name: "announce",
  async func(msg, { content, guild, author, member, reply, args }) {
    if(args[0]==null||args[0]=="")return reply(`I can't send an empty announcement.`);

    if(guild.ownerID==author.id||member.hasPermission("ADMINISTRATOR")){
      guild.members.forEach(u=>u.send(`Announcement from <@${author.id}> in server [${guild.name}]: ${content.substring((prefix+'announce ').length)}`));
      return reply(`Announcement sent!`);
    }else{
      return reply(`You must be server owner to use this cmd...`);
    }
  }
};
