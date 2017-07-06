const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

ex = {};

ex.name = "-vs";
ex.func = async (msg, {
  send,
  channel,
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
          if(args[2]&&args[2]=='ban'){
            if(args[3]&&(args[3]=='customize'||args[3]=='customise')){
              let s = new Searcher(guild);

              let cancelA = false, cancelB = false, thesht;
              let theregex, length=false, thetimer;
              let errored = false;
              const WAITFORSHT = 60*1000;

              const authorFilter = (m) => {
                if(m.author.id != author.id) return false;
                else return true;
              };

              const cancelFilter = (m) => m.content.toLowerCase().indexOf('cancel')>-1;

              const regexSaver = (m) => {
                if(!authorFilter(m)) return false;
                if(cancelFilter(m)) {
                  cancelA = true;
                  return true;
                }
                if(m.content.toLowerCase().startsWith('length:')){
                  length = m.content.toLowerCase().replace('length:','').replace(/\s+/g,'');
                  if(isNaN(length)){
                    errored=true;
                    return reply('Invalid name length of '+length);
                  }
                  m.channel.send(`Okay, creating a regex that matches a name with ${length} characters`);
                  theregex = new RegExp(`^\\w{${length},${length}}$`);
                }else theregex = new RegExp(m.content.toLowerCase());
                m.channel.send(`Regex set as ${theregex}`);
                return true;
              };

              const regexprompter = [
                'Please enter name ban parameters. This is either a **regex** or **length of name** I will match against people here.',
                'To set a length of the name type `length:` followed by the length of the new user\'s name.',
                '\t*For example, typing `length:5` will set it so I will ban names with a length of five.*',
                'To set a regex simply type your regexp but __**omit**__ the starting and ending `/`',
                '\t*For example, if your regex is `/aregexp/` you would type `aregexp`',
                'Type __cancel__ to exit'
              ].join('\n');

              const timedBanner = (m) => {
                if(!authorFilter(m)) return false;
                if(cancelFilter(m)) {
                  cancelB = true;
                  return true;
                }
                if(~m.content.toLowerCase().indexOf('-1'))
                  thetimer = false;
                else {
                  try{
                    thetimer = parseInt(m.content.toLowerCase());
                    if(isNaN(thetimer)) throw 'Invalid time given. Please start over';
                  }catch(err){
                    m.reply(err);
                    errored = true;
                    return true;
                  }
                }
                thesht = m;
                return true;
              };

              const timedprompter = [
                '**Please enter a whole number (in minutes) that will be banned with the matcher you just set.**',
                '\t*For example, typing `5` will set it so people who joined within 5 minutes ago whos names match the criteria you set above will be banned*',
                'Type __cancel__ to exit, or __-1__ to ban all matches regardless of join time',
              ].join('\n');

              const confirmSettings = (m) => {
                if(!authorFilter(m)) return false;
                if(/^(?:y(?:es)?)|(?:no?)$/i.test(m.content.toLowerCase())){
                  errored = !(/^(?:y(?:es)?)$/i.test(m.content.toLowerCase()));
                }
                return true;
              };

              try{
                await channel.send(regexprompter);
                await channel.awaitMessages(regexSaver, { max: 1, time: WAITFORSHT, errors: ['time'] });
                if(cancelA) return reply('Cancelled');
                if(errored) return;

                await channel.send(timedprompter);
                await channel.awaitMessages(timedBanner, { max: 1, time: WAITFORSHT, errors: ['time'] });
                if(cancelB) return reply('Cancelled');
                if(errored) return;
                let membersToBan = [];
                let a=s.searchMember(theregex);
                if(thetimer)
                  a.forEach( me=> {
                    if(Math.abs(Date.now()-me.joinedAt)<(parseInt(thetimer)*601000)) membersToBan.push(me);
                  });
                else membersToBan = a;
                const confirmation = [
                  'This is just to confirm...',
                  '**You are about to activate panic lockdown and ban users who match this criteria:**',
                  length?`\tUsername length is ${length}`:`\tName passes this regexp: ${theregex}`,
                  thetimer?`\tUser joined within the last ${thetimer} minutes`:'\tThe length of time the user has been in the server does not matter',
                  `This apples to __${membersToBan.length}__ member(s).`,
                  '**Type __y__es or __n__o.**',
                ].join('\n');
                await channel.send(confirmation);
                await channel.awaitMessages(confirmSettings, { max: 1, time: WAITFORSHT, errors: ['time'] });
                if(errored) return reply('Cancelled');

                send(`Banning ${membersToBan.length} member(s)`);
                membersToBan.forEach(m=>m.ban(`Antiraid rules set by ${thesht.author.tag}`));

              }catch(timed){
                console.log(timed);
                return reply('Timed out');
              }
            }
            if(memberjoin.panicKick[guild.id]) return reply('Panic lockdown is already enabled!');
            options = 'lockdown ';
            if(!memberjoin.panics[guild.id])
              memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
            await guild.setVerificationLevel(4);
            memberjoin.panics[guild.id] = true;
            memberjoin.panicBan[guild.id] = true;
            return reply(`Panic lockdown ban activated, verification level is now ${guild.verificationLevel}, and autoban initiated!`);

          }else{
            if(memberjoin.panicKick[guild.id]) return reply('Panic lockdown is already enabled!');
            options = 'lockdown ';
            if(!memberjoin.panics[guild.id])
              memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
            await guild.setVerificationLevel(4);
            memberjoin.panics[guild.id] = true;
            memberjoin.panicKick[guild.id] = true;
            return reply(`Panic lockdown activated, verification level is now ${guild.verificationLevel}, and new members who join during this time will get rekt!`);
          }}

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

    case 'setUnverifiedChannel ': { //disabling
      if (!args[1]) return send("No channel given :<");
      try{
        const target = args[1].match(Constants.patterns.CHANNEL)[1];
        return target;
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
