module.exports = {
  name: "emojiban",
  perm: ["server.emojiban"],
  async func(msg, { send, member, author, content, guild, args, gMember, Discord }) {
    const used = member || author;
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
        USE_EXTERNAL_EMOJIS: false
      });

    mem.addRole(ebanRole);

    const usernm = mem.user.username;

    send(`<@${author.id}>, user ${usernm} emoji banned successfully!`);

    let emb = new Discord.MessageEmbed()
      .setAuthor("Emoji Ban Log")
      .setTitle(`<@${mem.user.id}> was emoji banned by <@${author.id}>`)
      .setColor(9109504)
      .setThumbnail(Constants.images.WARNING)
      .addField("Emoji Ban reason: ", `${reason}`, true);
  }
};
