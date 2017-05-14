const nEmpireID="297800479356878849";

module.exports = {
  name: "announce",
  perm: ["server.announce"],
  async func(msg, { content, guild, author, member, reply, args }) {
    if(guild.ownerID==author.id||member.hasPermission("ADMINISTRATOR")){
      if(args[0]==null||args[0]=="")return reply(`I can't send an empty announcement.`);
      console.log(`[Announcement]: Announcement from <@${author.id}> in server [${guild.name}]: ${content.substring((prefix+'announce ').length)}`);
      guild.members.forEach(u=>{
        try{
          u.send(`**Announcement from <@${author.id}> in server [${guild.name}]**: ${content.substring((prefix+'announce ').length)}\n(Please note that the sender of this announcement cannot view replies made to this bot so please dm them instead.)`);
        }catch(err){
          console.log("Could not send announcement to user: " + u.id);
        }
      });
      return reply(`Announcement sent!`);
    }else{
      console.log(`[Announcement]: DENIED Announcement from <@${author.id}> in server [${guild.name}]: ${content.substring((prefix+'announce ').length)}`);
      return reply(`You must be server owner or admin to use this cmd...`);
    }
  }
};
