const Searcher = require(path.join(__dirname, '../handlers/Searcher')).default;
module.exports = {
  name: "info",
  async func(msg, {send, member, author, content, channel, guild, args, gMember, Discord, reply, bot}) {
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
    if(!searchers || searchers[guild.id]==null){
      console.log("[Filter] Creating new searcher for guild " + guild.id);
      let options = { guild: guild };
      searchers[guild.id] = new Searcher( options.guild );
    }

    if(action=="server"){
      return send(`Name of this server: ${guild.name}`);
    }else if(action=="user"){
      if (!args[1]) return send("No user given :<");
      else{
        let list = searchers[guild.id].searchMember(args[1]);
        if(list.length>1) await send("Multiple matches found, using first one..");
        let member = list[0];
        return send(`Userid: ${member.id}
Name: ${member.displayName}`);
      }
    }
      /*
      if (!args[1]) return send("No keyword given to add to the blacklist");
      else{
        let keyword = content.slice((prefix+'-blacklist '+ action + ' ').length).toLowerCase();
        blacklist[guild.id].push(keyword);
        filter=require(path.join(__dirname, '../handlers', 'Filter'))();
        console.log(`New blacklist: ${blacklist}`);
        database.sheets['filter'].addRow({guildid: guild.id, keyword: keyword});
        return reply(`Keyword ${keyword} blacklisted successfully`);
      }
    }else if(action=="toggle"){
      onFilter[guild.id]=!onFilter[guild.id];
      reply(`Filter status toggled!: ${onFilter[guild.id]}`);
    }else if(action=="off"){
      onFilter[guild.id]=false;
      reply(`Filter turned off (will auto-reenable)!`);
    }else if(action=="permoff"){
      onFilter[guild.id]=false;
      autoOverride[guild.id]=true;
      reply(`Filter status permanently toggled off (until next bot restart)!`);
    }else if(action=="on"){
      onFilter[guild.id]=true;
      autoOverride[guild.id]=false;
      reply(`Filter status toggled on!`);
    }
    if(!onFilter[guild.id]) okSpamLogs[guild.id]=0;*/
  }
};
