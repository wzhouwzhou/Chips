//const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

ex = {};

ex.name = "-vs";
ex.func = async (msg, {
  send,
  author,
  guild,
  args,
  gMember,
  reply,
  Discord,
  client,
}) =>{
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

      if(targetMember.roles.get('305302877641900052')==null&&targetMember.roles.find('name','unverified')==null&&targetMember.roles.find('name','Unverified')==null)
        return reply(`User does not have the unverified role!`);
      try{
        let therole = targetMember.roles.find('name','unverified')||targetMember.roles.find('name','Unverified');
        await targetMember.removeRole(guild.roles.get('305302877641900052')||therole);
        if(client.memberjoin.verifyLogC[guild.id]){
          let embed = new Discord.RichEmbed();
          embed.setTitle('Member Verification').setColor(_.random(1,16777215));
          embed.setDescription(`<@${targetMember.id}> was just verified by <@${author.id}>!`);
          if(guild.channels.get(client.memberjoin.verifyLogC[guild.id]))
            guild.channels.get(client.memberjoin.verifyLogC[guild.id]).send('', { embed }).catch(err=>{
              reply('Could not log the verification...');
              console.log(err);
            });
        }
        return reply('User verified successfully!');
      } catch (err) {
        console.log('Could not remove unverified role..probably: '+err);
        return reply('User not unverified :< Something went wrong..');
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
          if(!memberjoin.panics[guild.id])
            memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
          await guild.setVerificationLevel(4);
          memberjoin.panics[guild.id] = true;
          memberjoin.panicKick[guild.id] = true;
          return reply(`Panic lockdown activated, verification level is now ${guild.verificationLevel}, and new members who join during this time will get rekt!`);}

        case 'lockdown ban':{
          if(memberjoin.panicKick[guild.id]) return reply('Panic lockdown is already enabled!');
          options = 'lockdown ';
          if(!memberjoin.panics[guild.id])
            memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
          await guild.setVerificationLevel(4);
          memberjoin.panics[guild.id] = true;
          memberjoin.panicBan[guild.id] = true;
          return reply(`Panic lockdown ban activated, verification level is now ${guild.verificationLevel}, and autoban initiated!`);}

        case 'none':{
          if(memberjoin.panics[guild.id]) return reply('Panic is already enabled!');
          memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
          await guild.setVerificationLevel(3);
          memberjoin.panics[guild.id]=true;
          return reply(`Panic activated, verification level is now ${guild.verificationLevel}`);}
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

    case 'setUnverifiedChannel': {
      if (!args[1]) return send("No channel given :<");
      try{
        const target = args[1].match(Constants.patterns.CHANNEL)[1];
        return;
      }catch(err){
        return reply(`Invalid channel specified`);
      }}

    case 'regenperms': {
      const unverRole = guild.roles.find('name','Unverified');
      const unverChan = guild.channels.find('name', 'unverified');
      if(!unverRole||!unverChan) return reply('Uh oh! Antiraid role and channel names are not set properly');
      const channels = guild.channels.filter(c => c.type === 'text');
      for (const channel of channels.values())
        await channel.overwritePermissions(unverRole, {
          SEND_MESSAGES: false
        });

      await unverChan.overwritePermissions(unverRole, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true,
      });

      return reply('Done!');
    }
  }
};

module.exports = ex;
