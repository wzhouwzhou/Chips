module.exports = {
  name: "points",
  async func(msg, {send, member, author, content, channel, guild, args, gMember, Discord, reply, bot}) {
    if(!guild||guild.id!="257889450850254848") return;
    const used = member || author;
    let dbUser = database.sinxUsers.get(used.id);
    if(dbUser!=null)
      return reply(`You have: ${dbUser.points} points`);
    else
      return reply(`You have no points`);
  }
};
