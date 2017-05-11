const Searcher = require(path.join(__dirname, '../handlers/Searcher')).default;
module.exports = {
  name: "info",
  async func(msg, {send, member, author, channel, guild, args, gMember, Discord, reply }) {
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
      if (!args[1]) return send("No user given :<");
      else{
        let member;
        try{ //get mention:
          console.log("Trying to find user by mention..");
          let target = args[1].match(Constants.patterns.MENTION)[1];
          member = gMember(target);
        }catch(err){  //gMember failed:
          console.log("Finding by mention failed...");
          let list = searchers[guild.id].searchMember(args[1]);
          if(list.length>1) await send("Multiple matches found, using first one..");
          else if(list.length<1) return await send(`User [${args[1]}] not found!`);
          member = list[0];
        }
        return await send(`Userid: ${member.id}\nName: ${member.displayName}`);
      }
    }else if(action == "role"){
      if (!args[1]) return send("No role given :<");
      else{
        let role;
        let list = searchers[guild.id].searchRole(args[1]);
        if(list.length>1) await send("Multiple matches found, using first one..");
        else if(list.length<1) return await send(`User [${args[1]}] not found!`);
        role = list[0];
        return await send(`Role Id: ${role.id}\nRole Name: ${role.name}\nMember count: ${role.members.size}`);
      }
    }else if(action == "channel"){
      if (!args[1]) return send("No channel given :<");
      else{
        let channel;
        let list = searchers[guild.id].searchChannel(args[1]);
        if(list.length>1) await send("Multiple matches found, using first one..");
        else if(list.length<1) return await send(`Channel [${args[1]}] not found!`);
        role = list[0];
        return await send(`Channel Id: ${role.id}\Channel Name: ${role.name}\nMember count: ${role.members.size}`);
      }
    }
  }
};
