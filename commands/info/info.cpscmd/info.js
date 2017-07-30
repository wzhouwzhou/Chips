const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

const ex = {
  name: "info",
  async func(msg, {send, member, author, guild, args, gMember, reply, content, prefix, Discord, times, convertTime, getUser }) {
    let start = process.hrtime();
    const used = member || author;
    let action;
    if (!args[0]) return send("No action given :(");
    else action = args[0];

    console.log("[Info] Action: "+action);
    console.log("[Info] Creating new searcher for guild " + guild.id);
    let options = { guild: guild };
    searchers[guild.id] = new Searcher( options.guild );
    let infobad = new Discord.RichEmbed().setColor(member.displayColor).setFooter(new Date());

    if(action=="server"){
      try{
        let info = await permissions.checkMulti(msg, ['global.info.info.server']);
        console.log("[Command] "+ info);
      }catch(err){
        if(!member.hasPermission('global.info.info.server')){
          console.log("Rejected info server to " + used.id);
          return msg.reply(err);
        }
      }

      let diff =  moment().diff(guild.createdAt,'days');

      let trueMemC = guild.members.filter((member) => { return !member.user.bot; });
      let online = 0, idle = 0, dnd = 0, available = 0;
      guild.presences.filter((presence) => {
        switch(presence.status){
          case "online":
            online++;
            available++;
          break;

          case "idle":
            idle++;
            available++;
          break;

          case "dnd":
            dnd++;
            available++;
          break;
        }
        return true;
      });

      let textC = 0, voiceC = 0, tC = 0, nsfw = 0;
      guild.channels.filter((c) => {
        if(c.type=="text") textC++;
        else if(c.type=="voice") voiceC++;
        tC++;
        if(c.nsfw) nsfw++;
        return true;
      });

      let vInfo = 'there is no verification requirement.';
      let vLvl = guild.verificationLevel;
      if (vLvl >= 1) vInfo = "New users without a role must have an email linked to their account. ";
      if (vLvl >= 2) vInfo+= "They must also be registered on Discord for more than five minutes. ";
      if (vLvl >= 3) vInfo+= "In addition, upon joining, new members without a role must wait 10 minutes before they are able to speak. ";
      else if (vLvl >= 4) vInfo+= "In addition, upon joining, new users without a role must verify themselves with a mobile device before they are able to speak. ";
      let highestRole = guild._sortedRoles.last();
      let gname = guild.name.replace('@','(at)');
      [
        [`Name of this server: ${gname}`, `Guild id: ${guild.id}`],
        ['Server owner:', `${getUser(guild.ownerID).tag} <@${guild.ownerID}>`],
        [`Number of roles: ${guild.roles.size}`,`Highest role: ${highestRole.name} (${highestRole.id})`],
        [`Total number of channels: ${tC}`, `Total number of nsfw channels: ${nsfw}`],
        [`Text channel count:`, textC, true],
        [`Voice channel count:`, voiceC, true],
        [`Server region (voice): `, guild.region, true],
        ['Default channel:',`<#${guild.defaultChannel.id}>`, true],
        [`AFK voice channel: ${guild.afkChannelID?'#'+guild.channels.get(guild.afkChannelID).name:''}`,`${guild.afkChannelID?'AFK Timeout: '+ guild.afkTimeout/60 +' minute(s)':'None'}` ],
        [`Date created: ${guild.createdAt.toUTCString()}`, `That's about ${diff} days ago!`],
        ['Member count:', `${guild.memberCount>1?guild.memberCount+'members':'1 member'}`, true],
        [`Total number of members: ${trueMemC.size} (Not including bots)`,`There ${guild.members.size-trueMemC.size==1?'is':'are'} ${guild.members.size-trueMemC.size} bot${guild.members.size-trueMemC.size==1?'':'s'}!`, true],
        [`Reachable members (online, idle or dnd): ${available}`, `There  ${guild.members.size-available==1?'is':'are'} <:offline:313956277237710868> ${guild.members.size-available} ${guild.members.size-available==1?'person':'people'} offline or invisible`],
        ['Online: <:online:313956277808005120>', online, true],
        ['Idle: <:away:313956277220802560>', idle, true],
        ['Dnd: <:dnd:313956276893646850>', dnd, true],
        [`Verification level: ${vLvl}`,`That means ${vInfo}`]
      ].forEach(f=>infobad.addField(...f));

      await reply(`Server info`, {embed: infobad});
      infobad = new Discord.RichEmbed();
      infobad.setColor(member.displayColor).setAuthor('Server Emojis').setTitle(`Emoji List! # of emotes: ${guild.emojis.size}`);
      infobad.setDescription(`${guild.emojis.array().join(' ')}\n\n**Server icon:**`);
      if (guild.iconURL) infobad.setImage(guild.iconURL);
      let hrTime = process.hrtime(start);
      let µs = false;
      let end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
      if(end<1){
        µs = true;
        end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
      }
      µs ? end += 'µs' : end += 'ms';
      infobad.setFooter(`--Server info lookup and calculations took ${(end)}.--`);
      return send('', {embed: infobad});
    }else if(action=="user"){
      let member=used;

      let multiple = false;
      if (args[1]){
        try{ //get mention:
          console.log("Trying to find user by mention..");
          let target = args[1].match(Constants.patterns.MENTION)[1];
          member = gMember(target);
          if(member.id!=author.id){
            try{
              let info = await permissions.checkMulti(msg, ['global.info.info.user.other']);
              console.log("[Info] "+ info);
            }catch(err){
              if(!member.hasPermission(ex.customperm[0])){
                console.log("Rejected info user other to " + used.id);
                return msg.reply(err);
              }
            }
          }else{
            try{
              let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
              console.log("[Info] "+ info);
            }catch(err){
              if(!member.hasPermission(ex.customperm[0])){
                console.log("Rejected info self other to " + used.id);
                return msg.reply(err);
              }
            }
          }
          if(member==null) throw "NotMemberMention";
        }catch(err){  //gMember failed:
          console.log("Finding by mention failed...");
          member = content.substring(`${prefix}info ${action} `.length);
          let list = searchers[guild.id].searchMember(member);
          if(list.length>1) multiple = true;
          else if(list.length<1) return await send(`User [${member}] not found!`);
          member = list[0];
          if(member.id!=author.id){
            try{
              let info = await permissions.checkMulti(msg, ['global.info.info.user.other']);
              console.log("[Info] "+ info);
            }catch(err){
              if(!member.hasPermission(ex.customperm[0])){
                console.log("Rejected info user other to " + used.id);
                return msg.reply(err);
              }
            }
          }else{
            try{
              let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
              console.log("[Info] "+ info);
            }catch(err){
              if(!member.hasPermission(ex.customperm[0])){
                console.log("Rejected info self other to " + used.id);
                return msg.reply(err);
              }
            }
          }
        }
        const embed = await userData (member, infobad, convertTime, times);

        return await send(`User info ${multiple?'(multiple users were found, using the first one)':''}`, {embed});
      }else{
        try{
          let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
          console.log("[Command] "+ info);
        }catch(err){
          if(!member.hasPermission(ex.customperm[0])){
            console.log("Rejected info user (self) to " + used.id);
            return msg.reply(err);
          }
        }
        const embed = await userData (member, infobad, convertTime, times);

        return await send(`User info`, {embed});
      }
    }else if(action == "role"){
      try{
        let info = await permissions.checkMulti(msg, ['global.info.info.role']);
        console.log("[Command] "+ info);
      }catch(err){
        if(!member.hasPermission(ex.customperm[0])){
          console.log("Rejected info role to " + used.id);
          return msg.reply(err);
        }
      }

      if (!args[1]) return send("No role given :<");
      else{
        let role;
        try{
          role = args[1].substring(3,args[1].length-1);
          console.log("Trying to find role from mention " + role);
          role = guild.roles.get(role);
          if(!role) throw "NotRoleId";
        }catch(err){  //failed to find by id
          role = content.substring(`${prefix}info ${action} `.length);
          let list = searchers[guild.id].searchRole(role);
          if(list.length>1) await send("Multiple matches found, using first one..");
          else if(list.length<1) return await send(`Role [${role}] not found!`);
          role = list[0];
        }
        let rolename = role.name.replace('@','(at)');

        let diff;
        highest = "years";
        if(role){
          diff = await convertTime(role.createdAt,times.indexOf(highest));
          //send("diff2-1: " + diff2);
          diff = `${diff[0]} ${times[diff[1]]}`;
          //send("diff2-2: " + diff2);
        }else diff="NAN";

        let memList = '';
        for(mem of role.members.array()){
          memList += `[<@${mem.id}>] `;
          if(memList.length>1000) {
            memList = "Member list is too long!";
            break;
          }
        }

        let trueMemC = role.members.filter((member) => { return !member.user.bot; });
        let online = 0, idle = 0, dnd = 0, available = 0;
        trueMemC.filter((member) => {
          switch(member.presence.status){
            case "online":
              online++;
              available++;
            break;

            case "idle":
              idle++;
              available++;
            break;

            case "dnd":
              dnd++;
              available++;
            break;
          }
          return true;
        });
        infobad.setColor(role.color);
        infobad.setTitle(`Role Lookup for role [${rolename}]`); //<@&${role.id}>`);
        infobad.addField(`Role id: `, `${role.id}`);
        infobad.addField(`Creation date: ${role.createdAt.toUTCString()}`,`That's about ${diff} ago!`);
        infobad.addField(`Total number of members with this role: ${trueMemC.size} (Not including bots)`,`There ${role.members.size-trueMemC.size==1?'is':'are'} ${role.members.size-trueMemC.size} bot${role.members.size-trueMemC.size==1?'':'s'} with this role!`);
        infobad.addField(`Reachable members (online, idle or dnd): ${available}`, `There ${role.members.size-available==1?'is':'are'} <:offline:313956277237710868> ${role.members.size-available} ${role.members.size-available==1?'person':'people'} with this role offline or invisible`);
        infobad.addField(`Online: <:online:313956277808005120>`, online, true)
               .addField(`Idle: <:away:313956277220802560>    `, idle  , true)
               .addField(`Dnd: <:dnd:313956276893646850>      `, dnd   , true);
        infobad.addField(`Mentionable: `,`${role.mentionable}`);
        infobad.addField(`Role Colour: `,`${role.hexColor}`);
        infobad.addField(`Hoist: ${role.hoist}`,`This means that the role is ${role.hoist?'':'not '}displayed separately in the member list.`);
        infobad.addField(`Position: ${role.calculatedPosition}`,`This means that the role is ${role.calculatedPosition+1==guild.roles.size?'1st':(role.calculatedPosition+2==guild.roles.size?'2nd':(role.calculatedPosition+3==guild.roles.size?'3rd':((guild.roles.size-role.calculatedPosition)+'th')))} highest in this server!`);
        infobad.addField(`Members with this role: `,`${memList?memList:'Nobody has this role!'}`);
        return await reply(`Role information: `,{embed: infobad});
        //return await send(`Role Id: ${role.id}\nRole Name: ${rolename}\nMember count: ${role.members.size}`);
      }
    }else if(action == "channel"){
      try{
        let info = await permissions.checkMulti(msg, ['global.info.info.channel']);
        console.log("[Command] "+ info);
      }catch(err){
        if(!member.hasPermission(ex.customperm[0])){
          console.log("Rejected info channel to " + used.id);
          return msg.reply(err);
        }
      }
      let channel;
      if (!args[1]) channel = msg.channel;
      if(!channel){
        try{
          channel = args[1].substring(2,args[1].length-1);
          console.log("Trying to find channel from link " + channel);
          channel = guild.channels.get(channel);
          if(channel==null) throw "NotChannelId";
        }catch(err){
          channel = content.substring(`${prefix}info ${action} `.length);
          let list = searchers[guild.id].searchChannel(channel);
          if(list.length>1) {await send("Multiple matches found, using first one.."); console.log(list);}
          else if(list.length<1) return await send(`Channel [${channel}] not found!`);
          channel = list[0];
        }
      }
      if(channel){
        let cname = channel.name.replace('@','(at)');

        let diff;
        highest = "years";
        if(channel){
          diff = await convertTime(channel.createdAt,times.indexOf(highest));
          //send("diff2-1: " + diff2);
          diff = `${diff[0]} ${times[diff[1]]}`;
          //send("diff2-2: " + diff2);
        }else diff="NAN";

        let memList = '';
        for(mem of channel.members.array()){
          memList += `[<@${mem.id}>] `;
          if(memList.length>1000) {
            memList = "Member list is too long!";
            break;
          }
        }

        let trueMemC = channel.members.filter((member) => { return !member.user.bot; });
        let online = 0, idle = 0, dnd = 0, available = 0;
        trueMemC.filter((member) => {
          switch(member.presence.status){
            case "online":
              online++;
              available++;
            break;

            case "idle":
              idle++;
              available++;
            break;

            case "dnd":
              dnd++;
              available++;
            break;
          }
          return true;
        });
        infobad.setTitle(`Channel Lookup for channel [${cname}]`);
        infobad.addField(`Channel Topic:`,`${channel.topic?channel.topic:'None'}`);
        infobad.addField(`Channel ID: `, `${channel.id}`);
        infobad.addField(`Creation date: ${channel.createdAt.toUTCString()}`,`That's about ${diff} ago!`);
        infobad.addField(`Total number of members who can see this channel: ${trueMemC.size} (Not including bots)`,`There ${channel.members.size-trueMemC.size==1?'is':'are'} ${channel.members.size-trueMemC.size} bot${channel.members.size-trueMemC.size==1?'':'s'} with access to this channel!`);
        infobad.addField(`Reachable members (online, idle or dnd): ${available}`, `There ${trueMemC.size-available==1?'is':'are'} <:offline:313956277237710868> ${trueMemC.size-available} ${trueMemC.size-available==1?'person':'people'} with access to this channel offline or invisible`);
        infobad.addField(`Online: <:online:313956277808005120>`, online, true)
               .addField(`Idle: <:away:313956277220802560>    `, idle  , true)
               .addField(`Dnd: <:dnd:313956276893646850>      `, dnd   , true);
        infobad.addField(`Position: ${channel.calculatedPosition}`,`This means that the channel is ${channel.calculatedPosition==0?'1st':(channel.calculatedPosition==1?'2nd':(channel.calculatedPosition==2?'3rd':((channel.calculatedPosition+1)+'th')))} on the channel list in the sidebar!`);
        infobad.addField(`Permission Overwrite Count: `,`${channel.permissionOverwrites.size}`);
        infobad.addField(`Nsfw channel: `,`${channel.nsfw?'yes':'no'}`);
        infobad.addField(`Members with access to this channel: `,memList);
        return await reply(`Channel information: `,{embed: infobad});
      }
    }
  }
};

const userData = (member, infobad, convertTime, times) => {
  return new Promise( async res => {
    const membername = member.displayName.replace('@','(at)');
    let highest = "years";
    diff = await convertTime(member.joinedAt,times.indexOf(highest));
    diff = `${diff[0]} ${times[diff[1]]}`;

    /*let diff2;
    highest = "years";
    if(member.lastMessage){
      diff2 = await convertTime(member.lastMessage.createdAt,times.indexOf(highest));
      //send("diff2-1: " + diff2);
      diff2 = `${diff2[0]} ${times[diff2[1]]}`;
      //send("diff2-2: " + diff2);
    }else diff2="NAN";*/

    let diff3;
    highest = "years";
    diff3 = await convertTime(member.user.createdAt, times.indexOf(highest));
    diff3 = `${diff3[0]} ${times[diff3[1]]}`;
    infobad.addField(`${member.user.tag}: `, `${member.presence.game?member.presence.game.name:'Not playing anything.'}`, true);
    infobad.addField('User id:', `${member.id}`, true)
           .addField('Nickname:', `${membername}`, true);
    infobad.addField(`Joined Discord on ${member.user.createdAt.toUTCString()}`,`That's about ${diff3} ago!`);
    infobad.addField('Joined',`About ${diff} ago on ${member.joinedAt.toUTCString()}`);
    //infobad.addField(`${member.lastMessage?"Last seen here at: "+member.lastMessage.createdAt.toUTCString():"Last seen here: Unknown"}`,`${diff2!="NAN"?"That's about "+diff2+" ago!":"Time ago: Unknown"}`);
    infobad.addField(`Colour: `,`${member.displayHexColor}`,true)
           .addField(`Highest Role: ${member.highestRole.name}`,`Total number of roles: ${member.roles.size}`, true);
    //infobad.addField(`Status:`,`    ${member.presence.status}`, true);
    infobad.addField(`Permissions number:`,member.permissions.bitfield);
    //infobad.addField(`Avatar URL`, `[Click Here](${member.user.avatarURL})`);
    infobad.setThumbnail(member.user.avatarURL);
    infobad.setColor(member.displayColor);

    res(infobad);
  });
};

module.exports = ex;
