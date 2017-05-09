const nEmpireID="297800479356878849";

module.exports = {
  name: "announce",
  async func(msg, { content, guild, author, reply }) {
  if(guild.ownerID==author.id)
    await guild.members.forEach(u=>u.send(`Announcement from <@${author.id}> in server [${guild.name}]: ${content.substring((prefix+'announce ').length)}`));
    return reply(`Announcement sent!`);
  }else{
    return reply(`You must be server owner to use this cmd...`);
  }
};
