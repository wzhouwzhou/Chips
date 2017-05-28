let ex = {};

ex.antiraidWelcome = {
  "257889450850254848": `<@&305302877641900052> Welcome to Sinbadx Knights! If you would like to get verified and be able to speak in the other channels, please answer the following questions! \n
1. How did you hear about this server?
2. Why did you join this server?
3. Do you promise to read <#297263352252727296>?
4. What is your favorite diep.io tank?
Make sure you send your answers in this channel (don't DM them)!`,

  "302983444009451541": `Hai hoi! I'm just testing :>`,
};

ex = {
  name: "-vs",
  perm: ["server.-vs"],
  async func(msg, {send, member, author, guild, args, gMember, reply }) {
    const used = member || author;

    if (!args[0]) return send("No action given :(");

    /*const split = content.replace(/\s+/g, ' ').trim().split(" ");
    let reason = split.slice(2, split.length).join(" ");
    if (reason == "") reason = "None";*/
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
          break;
        default:
          return;
      }
    }


    if(args[0]=="ok"){
      if (!args[1]) return send("No user given :<");
      let targetMember;
      try{
        const target = args[1].match(Constants.patterns.MENTION)[1];
        const user = gMember(target).user;
        targetMember = guild.members.get(user.id);
        console.log("[VS](ok) Target: "+target);
      }catch(err){
        return reply(`Invalid user specified`);
      }

      if(targetMember.roles.get('305302877641900052')==null&&targetMember.roles.find('name','unverified')==null)
        return reply(`User does not have the unverified role!`);
      try{
        await targetMember.removeRole(guild.roles.get('305302877641900052')||guild.roles.find('name','unverified'));
        reply(`User verified successfully!`);
      } catch (err) {
        console.log("could not remove unverified role");
        reply(`User not unverified :< Something went wrong..`);
      }
    }else if(args[0]=="welcome"){
      if(!ex.antiraidWelcome[guild.id]) return reply(`A welcome message has not been set for this server!`);
      send(ex.antiraidWelcome[guild.id]);
    }
  }
};

module.exports = ex;
