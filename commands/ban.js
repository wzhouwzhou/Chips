module.exports = {
  name: "ban",
  async func(msg, { send, member, author, content, channel, guild, args, gMember, Discord}) {
    const used = member || author;
    switch (used.id) {
      case Constants.users.WILLYZ:
      case Constants.users.PGSUPER:
      case Constants.users.ZALGO:
        break;
      default:
        return send(`No bans for you! ${member.displayName}`);
    }
    if (!args[0]) return send("No user given :(");
    const target = args[0].match(Constants.patterns.MENTION)[1];
    // console.log("Target: "+target);

    const split = content.replace(/\s+/g,' ').trim().split(" ");
    const reason = split.slice(2,split.length).join(" ");

    const user = gMember(target).user;

    let emb = new Discord.RichEmbed()
      .setTitle("Ban Notice!")
      .setAuthor(`You were banned from the server: ${guild.name}!`)
      .setColor(9109504)
      .setThumbnail("https://i.ppy.sh/2dabc46c70a032cdeac21093ac8c4b9204f04e75/687474703a2f2f692e696d6775722e636f6d2f5a4e4f7445494e2e706e67")
      .addField("Ban reason: ", `(${reason})`,true);

    user.sendEmbed(emb);

    const usernm=user.username;

    send(`${member.displayName}, user banned succesfully!`);

    channel.createWebhook("Mee6", Constants.avatars.MEE6)
      .then (whook => whook.edit('Mee6', Constants.avatars.MEE6))
      .then(hook => hook.sendMessage(`**${usernm}** left`)
        .then(m => {hook.delete();})
        .catch(console.error)
      );
  }
};
