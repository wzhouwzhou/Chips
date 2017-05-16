const Searcher = require(path.join(__dirname, '../handlers/Searcher')).default;
const ex = {
  name: "info",
  perm: ["global.info","global.info.all","global.info.serv","global.info.channel","global.info.role","global.info.user","global.info.user.self"],
  async func(msg, {send, member, author, channel, guild, args, gMember, reply, content }) {
    const used = member || author;
    let action;
    if (!args[0]) return send("No action given :(");
    else action = args[0];

    console.log("[Info] Action: "+action);
    console.log("[Info] Creating new searcher for guild " + guild.id);
    let options = { guild: guild };
    searchers[guild.id] = new Searcher( options.guild );

    if(action=="server"){
      permissions.checkPermission(msg, ex.perm[2]).then(info =>{
        console.log("[Command] "+ info);
        let gname = guild.name.replace('@','(at)');
        return send(`Name of this server: ${gname}`);
      }).catch(reason=>{
        console.log("Rejected info server to " + used.id);
        return msg.reply(reason);
      });
    }else if(action=="user"){
      let member=used;

      if (args[1]){
        permissions.checkPermission(msg, ex.perm[5]).then(async function(info) {
          try{ //get mention:
            console.log("Trying to find user by mention..");
            let target = args[1].match(Constants.patterns.MENTION)[1];
            member = gMember(target);
            if(member==null) throw "NotMemberMention";
          }catch(err){  //gMember failed:
            console.log("Finding by mention failed...");
            member = content.substring(`${prefix}info ${action} `.length);
            let list = searchers[guild.id].searchMember(member);
            if(list.length>1) await send("Multiple matches found, using first one..");
            else if(list.length<1) return await send(`User [${args[1]}] not found!`);
            member = list[0];
          }
          return await send(`Userid: ${member.id}\nName: ${member.displayName}`);
        }).catch(reason=>{
          console.log("Rejected info user to " + used.id);
          return msg.reply(reason);
        });
      }else{
        permissions.checkPermission(msg, ex.perm[6]).then(async function(info) {
          let membername = member.displayName.replace('@','(at)');
          return await send(`Userid: ${member.id}\nName: ${membername}`);
        }).catch(reason=>{
          console.log("Rejected info user to " + used.id);
          return msg.reply(reason);
        });
      }
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
          role = content.substring(`${prefix}info ${action} `.length);
          let list = searchers[guild.id].searchRole(role);
          if(list.length>1) await send("Multiple matches found, using first one..");
          else if(list.length<1) return await send(`Role [${args[1]}] not found!`);
          role = list[0];
        }
        let rolename = role.name.replace('@','(at)');
        return await send(`Role Id: ${role.id}\nRole Name: ${rolename}\nMember count: ${role.members.size}`);
      }
    }else if(action == "channel"){
        permissions.checkPermission(msg, ex.perm[3]).then(async function(info) {
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
            let cname = channel.name.replace('@','(at)');
            return await send(`Channel Id: ${channel.id}\nChannel Name: ${cname}\nMember count: ${channel.members.size}`);
          }
        }).catch(reason=>{
          console.log("Rejected info channel to " + used.id);
          return msg.reply(reason);
        });
    }
  }
};

module.exports = ex;
