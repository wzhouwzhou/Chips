module.exports = {
  name: "pmute",
  perm: ["server.mute"],
  async func(msg, { send, member, author, content, channel, guild, args, gMember, Discord }) {
    const used = member || author;
    /*switch (used.id) {
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
        return send(`No mutes for you! ${member.displayName}`);
    }*/

    if (!args[0]) return send("No user given :(");
    const target = args[0].match(Constants.patterns.MENTION)[1];
    // console.log("Target: "+target);
    const split = content.replace(/\s+/g, ' ').trim().split(" ");
    let reason = split.slice(2, split.length).join(" ");
    if (reason == "") reason = "None";

    const mem = gMember(target);
    let muterole= guild.roles.get("295551520425115649");

    mem.addRole(muterole);

    reply(`user <@${mem.id}> perma-muted successfully!`);

    let emb = new Discord.RichEmbed()
      .setAuthor("Mute Log")
      .setTitle(`<@${mem.user.id}> was perma-muted by <@${author.id}>`)
      .setColor(9109504)
      .setThumbnail(Constants.images.WARNING)
      .addField("Mute reason: ", `${reason}`, true);
    channel.send(' ', {embed: emb});
  }
};
