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

    if (!args[0]) return send("No user given :(");
    const target = args[0].match(Constants.patterns.MENTION)[1];
    // console.log("Target: "+target);
    const split = content.replace(/\s+/g, ' ').trim().split(" ");
    let reason = split.slice(2, split.length).join(" ");
    if (reason == "") reason = "None";

    const mem = gMember(target);

    let ebanRole=guild.roles.find("name","Emoji Banned");
    if (ebanRole==null)
      ebanRole= await guild.createRole(
        { name: 'Emoji Banned'}
      );

    if(ebanRole==null)console.log("Error getting emoji banned role");

    const channels = guild.channels.filter(c => c.type === 'text');
    if(channels==null)console.log("Error getting text channels");
    for (const channel of channels.values())
      await channel.overwritePermissions(ebanRole, {
        EXTERNAL_EMOJIS: false
      });

    mem.addRole(ebanRole);

    const usernm = mem.user.username;

    send(`${member.displayName}, user ${usernm} emoji banned successfully!`);
  }
};
