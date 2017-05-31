
module.exports = {
  name: "chipsprefix",
  perm: ["global.server.chipsprefix"],
  customperm: ["ADMINISTRATOR"],
  async func(msg, {send, member, guild, args, reply}) {
    if(!guild) return reply("You must be in a guild to use this command!");

    let action;
    if (!args[0]) args[0] = 'status';
    else action = args[0];

    console.log("[Custom prefix] Action: "+action);
    if((customprefix[guild.id]==null||onFilter[guild.id]==null)||autoOverride[guild.id]==null){
      console.log("[Filter] Creating new blacklist for guild " + guild.id);
      blacklist[guild.id]=['ok'];
      onFilter[guild.id]=true;
      autoOverride[guild.id]=false;
    }

    if(action=="status"){
      return send(`The prefix for this server is: ${customprefix[guild.id]?customprefix[guild.id]:prefix}`);
    }else if(action=="set"){
      if (!args[1]) return send("No custom prefix given to set!");
      else{
        let newprefix = _.drop(args).join(' ').toLowerCase();
        customprefix[guild.id]=newprefix;
        filter=require(path.join(__dirname, '../handlers', 'Filter'))();
        console.log(`${member.user.tag} changed prefix for guild ${guild.id}: ${newprefix}`);
        database.sheets['prefixes'].addRow({guildid: guild.id, prefix: newprefix});
        return reply(`Prefix ${newprefix} set as my prefix successfully!`);
      }
    }else if(action=="reset"||action=="off"){
      customprefix[guild.id]=prefix;
      database.sheets['prefixes'].addRow({guildid: guild.id, prefix: prefix});
      return reply(`Custom prefix reset! My prefix is now ${customprefix[guild.id]}`);
    }
  }
};
