
module.exports = {
  name: "-vs",
  async func(msg, {send, member, author, content, channel, guild, args, gMember, Discord, reply, bot}) {
    const used = member || author;

    if (!args[0]) return send("No action given :(");
    if (!args[1]) return send("No user given :<");

    const target = args[1].match(Constants.patterns.MENTION)[1];
    const split = content.replace(/\s+/g, ' ').trim().split(" ");
    let reason = split.slice(2, split.length).join(" ");
    if (reason == "") reason = "None";
    const user = gMember(target).user;
    if(!used.hasPermission("BAN_MEMBERS")){
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
          return;
      }
    }
    console.log("[VS] Target: "+target);
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
