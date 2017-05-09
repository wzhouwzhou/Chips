const nEmpireID="297800479356878849";

module.exports = {
  name: "announce",
  async func(msg, { content, guild, author }) {
  if(guild.ownerID==author.id)
    return guild.members.forEach(u=>u.send(`Announcement from <@${author.id}> in server [${guild.name}]: ${content.splice(prefix+'announce '.length)}`));
  }
};
