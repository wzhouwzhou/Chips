const Searcher = require(path.join(__dirname, '../handlers/Searcher')).default;
module.exports = {
  name: "info",
  perm: ["server.info"],
  async func(msg, {send, member, author, channel, guild, args, gMember, reply, content }) {
    const used = member || author;

    /*if(!used.hasPermission("KICK_MEMBERS")){
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
          return reply('You must have KICK_MEMBERS perms to use this command!');
      }
    }*/

    let action;
    if (!args[0]) return send("No action given :(");
    else action = args[0];

    console.log("[Info] Action: "+action);
    //if(!searchers || searchers[guild.id]==null){
      console.log("[Filter] Creating new searcher for guild " + guild.id);
      let options = { guild: guild };
      searchers[guild.id] = new Searcher( options.guild );
    //}

    if(action=="server"){
      return send(`Name of this server: ${guild.name}`);
    }else if(action=="user"){
      let member=used;
      if (args[1]){
        try{ //get mention:
          console.log("Trying to find user by mention..");
          let target = args[1].match(Constants.patterns.MENTION)[1];
          member = gMember(target);
          if(member==null) throw "NotMemberMention";
        }catch(err){  //gMember failed:
          console.log("Finding by mention failed...");
          member = content.subString(`${prefix}info ${action} `.length);
          let list = searchers[guild.id].searchMember(member);
          if(list.length>1) await send("Multiple matches found, using first one..");
          else if(list.length<1) return await send(`User [${args[1]}] not found!`);
          member = list[0];
        }
      }
      return await send(`Userid: ${member.id}\nName: ${member.displayName}`);
    }else if(action == "role"){
      if (!args[1]) return send("No role given :<");
      else{
        let role;
        try{
          role = args[1].substring(3,args[1].length-1);
          console.log("Trying to find role from mention " + role);
          role = guild.roles.get(role);
          if(role==null) throw "NotRoleId";
        }catch(err){  //failed to find by id
          role = content.subString(`${prefix}info ${action} `.length);
          let list = searchers[guild.id].searchRole(role);
          if(list.length>1) await send("Multiple matches found, using first one..");
          else if(list.length<1) return await send(`Role [${args[1]}] not found!`);
          role = list[0];
        }
        return await send(`Role Id: ${role.id}\nRole Name: ${role.name}\nMember count: ${role.members.size}`);
      }
    }else if(action == "channel"){
      if (!args[1]) return send("No channel given :<");
      else{
        let channel;
        try{
          channel = args[1].substring(2,args[1].length-1);
          console.log("Trying to find channel from link " + channel);
          channel = guild.roles.get(role);
          if(channel==null) throw "NotChannelId";
        }catch(err){
          let list = searchers[guild.id].searchChannel(channel);
          if(list.length>1) {await send("Multiple matches found, using first one.."); console.log(list);}
          else if(list.length<1) return await send(`Channel [${channel}] not found!`);
          channel = list[0];
        }
        return await send(`Channel Id: ${channel.id}\nChannel Name: ${channel.name}\nMember count: ${channel.members.size}`);
      }
    }
  }
};
