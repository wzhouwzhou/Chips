
ex = {};

ex.name = "-vs";
ex.perm = ["server.-vs"];
ex.customperm = ["BAN_MEMBERS"];
ex.func = async (msg, {send, member, author, guild, args, gMember, reply }) =>{
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
      case "302252773427249163":
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
    if(!memberjoin.antiraidWelcome[guild.id]) return reply(`A welcome message has not been set for this server!`);
    send(memberjoin.antiraidWelcome[guild.id]);
  }else if(args[0]=="panic"){
    memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
    await guild.setVerificationLevel(3);
    memberjoin.panics[guild.id]=true;
    return reply(`Panic activated, verification level is now ${guild.verificationLevel}`);
  }else if(args[0].toLowerCase()=="panicoff"){
    if(memberjoin.panics[guild.id]!=null&&memberjoin.panics[guild.id]){
      memberjoin.panics[guild.id]=false;
      guild.setVerificationLevel(memberjoin.antiraidOldVL[guild.id]);
      return reply(`Panic mode has been disabled! The verification level is now ${guild.verificationLevel} again.`);
    }else{
      return reply(`Panic mode was not enabled for this server!`);
    }
  }
};

module.exports = ex;
