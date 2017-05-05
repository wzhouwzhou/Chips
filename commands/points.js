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
    }else
    if(args[0]=="add"){
      if(args[2]==null)return reply(`Please specify the amount of points to add: \`\`-points add @/mention/ 123\`\``);
      let pts = parseInt(args[2]);
      if (pts.toString() != args[2]) return reply(`Please enter a valid number of points.`);

      let target, us;
      try{
        target = args[1].match(Constants.patterns.MENTION)[1];
      }catch(err){
        target=args[1];
      }

      if(target!=args[1]){
        try{
          const mem = gMember(target);
          us = database.sinxUsers.get(mem.id);
          database.sheets['members'].addRow({userid: mem.id, username: mem.user.username, points: pts, pointsrank: "Some rank"});
          if(database.sinxUsers.get(mem.id)==null){
            database.sinxUsers.set(mem.id, {userid: mem.id, username: mem.user.username, points: pts, pointsrank: "Some rank"});
            us = database.sinxUsers.get(mem.id);
          }else{
            us.points=parseInt(us.points,10)+pts;
          }
          if(us.points!=0)
            return reply(`[${mem.displayName}] now has: ${us.points} points`);
          else
            return reply(`[${mem.displayName}] now has no points`);
        }catch(err){
          console.log(err);
          //return reply(err);
          return reply(`Errored! Are you sure target user is in Sinbad Knights?`);
        }
      }else{
        return reply(`Errored.`);
      }
    }else
    if(args[0]=="set"){
      return reply(`This feature points.set is yet to be implemented`);
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
          let mem = gMember(target);
          us = database.sinxUsers.get(mem.id);
          if(us==null) return reply(`[${mem.displayName}] has no points`);
          if(us.points!=0)
            return reply(`[${mem.displayName}] has: ${us.points} points`);
          else
            return reply(`[${mem.displayName}] has no points`);
        }catch(err){
          return reply(`Target user is not in Sinbad Knights!`);
        }
      }else{
        //find by nickname
        target = content.subString(content.indexOf(target));
        let mem = guild.members.find('displayName',target);
        if(mem!=null){
          us = database.sinxUsers.get(mem.id);
          if(us==null) return reply(`[${mem.displayName}] has no points`);
          if(us.points!=0)
            return reply(`[${mem.displayName}] has: ${us.points} points`);
          else
            return reply(`[${mem.displayName}] has no points`);
        }else return reply(`Target user ${target} not found in this server!`);
      }
    }
  }
};
