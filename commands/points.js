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
      let target, us;
      try{
        target = args[0].match(Constants.patterns.MENTION)[1];
      }catch(err){
        target=args[0];
      }
      // console.log("Target: "+target);
      if(target!=args[0]){
        try{
          const mem = gMember(target);
          us = database.sinxUsers.get(mem.id);
          if(us.points!=0)
            return reply(`[${mem.nickname}] has: ${us.points} points`);
          else
            return reply(`[${mem.nickname}] has no points`);
        }catch(err){
          console.log(err);
          return reply(`Target user is not in Sinbad Knights!`);
        }
      }else{
        mem = guild.members.find('name',target);
        if(mem!=null){
          us = database.sinxUsers.get(mem.id);
          if(us.points!=0)
            return reply(`[${mem.nickname}] has: ${us.points} points`);
          else
            return reply(`[${mem.nickname}] has no points`);
        }else return reply(`Target user is not in this server!`);
      }
    }
  }
};
