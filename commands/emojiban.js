module.exports = {
  name: "emojiban",
  async func(msg, { send, member, author, content, channel, guild, args, gMember, Discord }) {
    const used = member || author;
    switch (used.id) {
      case Constants.users.WILLYZ:
      case Constants.users.PGSUPER:
      case Constants.users.ZALGO:
      case Constants.users.XZLQ:
      case Constants.users.KONEKO:
        break;
      default:
        return send(`No bans for you! ${member.displayName}`);
    }

    let ebanRole;
    if (!guild.roles.has("name", "Emoji Banned"))
      ebanRole= await guild.createRole(
        { name: 'Emoji Banned'}
      );

    let serverChannels=guild.channels.array;
    for(var i=0;i<serverChannels.length;i++)
      serverChannels[i].overwritePermissions(ebanRole, {
        EXTERNAL_EMOJIS: false
      });

    if (!args[0]) return send("No user given :(");
    const target = args[0].match(Constants.patterns.MENTION)[1];
    // console.log("Target: "+target);
    const split = content.replace(/\s+/g, ' ').trim().split(" ");
    let reason = split.slice(2, split.length).join(" ");
    if (reason == "") reason = "None";

    const user = gMember(target).user;

    user.addMember(ebanRole);

    const usernm = user.username;

    send(`${member.displayName}, user ${usernm} emoji banned successfully!`);
  }
};
