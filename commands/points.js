module.exports = {
  name: "points",
  async func(msg, {send, member, author, content, channel, guild, args, gMember, Discord, reply, bot}) {
    if(!guild||guild.id!="257889450850254848") return;
    const used = member || author;
    let dbUser = database.sinxUsers.get(used.id);
    if(args[0]==null){
      if(dbUser!=null)
        return reply(`You have: ${dbUser.points} points`);
      else
        return reply(`You have no points`);
    }else{
      const target = args[0].match(Constants.patterns.MENTION)[1];
      // console.log("Target: "+target);
      const mem = gMember(target);
      if(mem==null)
        return reply(`Target user is not in Sinbad Knights!`);
      else {
        upts = database.sinxUsers.get(mem.id);
        if(upts!=null)
          return reply(`[${mem.nickname}] has: ${upts} points`);
        else
          return reply(`[${mem.nickname}] has no points`);
      }
    }
  }
};
