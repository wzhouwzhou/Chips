
module.exports = {
  name: "-blacklist",
  async func(msg, {send, member, author, content, channel, guild, args, gMember, Discord, reply, bot}) {
    const used = member || author;

    if(!used.hasPermission("ADMINISTRATOR")){
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
          return reply('You must have Administrator perms to use this command!');
      }
    }

    let action;
    if (!args[0]) return send("No action given :(");
    else action = args[0];

    if(action=="add"){
      if (!args[1]) return send("No keyword given to add to the blacklist");
      else{
        let keyword = content.slice(('-blacklist '+ action + ' ').length);
        blacklist[guild.id].push(keyword);
        database.sheets['filter'].addRow({guildid: guild.id, keyword: keyword});
        return reply(`Keyword ${keyword} blacklisted successfullly`);
      }
    }

    console.log("[Blacklist] Action: "+action);
    let targetMember = guild.members.get(user.id);

    if(args[0]=="ok"){
      if(targetMember.roles.find('name','lollipop-unverified')==null)
        return reply(`User does not have the unverified role!`);
      try{
        targetMember.removeRole(guild.roles.find('name','lollipop-unverified'));
        reply(`User verified successfully!`);
      } catch (err) {
        console.log("could not remove unverified role");
        reply(`User not unverified :< Something went wrong..`);
      }
    }
  }
};
