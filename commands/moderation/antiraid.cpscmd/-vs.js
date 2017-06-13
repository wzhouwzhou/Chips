const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

ex = {};

ex.name = "-vs";
ex.perm = ["global.server.-vs"];
ex.customperm = ["BAN_MEMBERS"];
ex.func = async (msg, {send, guild, args, gMember, reply }) =>{
  if(!guild) return reply("You must use this in a server!");
  if (!args[0]) return reply("No action given :(");

  let action = args[0].toLowerCase();
  switch(action){
    case 'ok':{
      if (!args[1]) return reply("No user given :<");
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
        return reply(`User verified successfully!`);
      } catch (err) {
        console.log("could not remove unverified role");
        return reply(`User not unverified :< Something went wrong..`);
      }}

    case 'welcome':{
      if(!memberjoin.antiraidWelcome[guild.id]) return reply(`A welcome message has not been set for this server!`);
      return send(memberjoin.antiraidWelcome[guild.id]);}

    case 'panic':{
      let options = args[1]?args[1]:'none';

      switch(options){
        case 'off':{
          if(memberjoin.panics[guild.id]!=null&&memberjoin.panics[guild.id]){
            memberjoin.panics[guild.id]=false;
            memberjoin.panicKick[guild.id] = false;
            await guild.setVerificationLevel(memberjoin.antiraidOldVL[guild.id]);
            return reply(`Panic mode has been disabled! The verification level is now ${guild.verificationLevel} again.`);
          }else{
            return reply(`Panic mode was not enabled for this server!`);
          }}
        case 'lockdown':{
          if(memberjoin.panicKick[guild.id]) return reply('Panic lockdown is already enabled!');
          options = 'lockdown ';
          memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
          await guild.setVerificationLevel(4);
          memberjoin.panicKick[guild.id] = true;
          return reply(`Panic lockdown activated, verification level is now ${guild.verificationLevel}, and new members who join during this time will get rekt!`);
        }

        case 'none':{
          if(memberjoin.panic[guild.id]&&!memberjoin.panicKick[guild.id]) return reply('Panic is already enabled!');
          memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
          await guild.setVerificationLevel(3);
          memberjoin.panics[guild.id]=true;
          return reply(`Panic activated, verification level is now ${guild.verificationLevel}`);
        }
      }
      return reply ('Something went wrong..');
    }

    case 'panicoff':{
      if(memberjoin.panics[guild.id]!=null&&memberjoin.panics[guild.id]){
        memberjoin.panics[guild.id]=false;
        memberjoin.panicKick[guild.id] = false;
        await guild.setVerificationLevel(memberjoin.antiraidOldVL[guild.id]);
        return reply(`Panic mode has been disabled! The verification level is now ${guild.verificationLevel} again.`);
      }else{
        return reply(`Panic mode was not enabled for this server!`);
      }}

    case 'setUnverifiedChannel':
      if (!args[1]) return send("No channel given :<");
      try{
        const target = args[1].match(Constants.patterns.CHANNEL)[1];
        const user = gMember(target).user;
        targetMember = guild.members.get(user.id);
        console.log("[VS](ok) Target: "+target);
      }catch(err){
        return reply(`Invalid user specified`);
      }

  }
};

module.exports = ex;
