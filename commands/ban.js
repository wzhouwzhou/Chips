const neko = [
	'265015624252653568', // arkhalis
	'240651964424126464', // loaf
	'259209114268336129', // willyz
	'242366901194457088', // wowie
	'270834390643376129', // harbinger
	'213312750703607808', // zalgo
	'220182743126900737', // garhu5
	'278734113735966720', // pie
	'223811504833691648', // nolife
	'208736038577897473', // xanthi
];

module.exports = {
  name: "ban",
  async func(msg, {send, member, author, content, channel, guild, args, gMember, Discord, reply, bot}) {
    const used = member || author;

    if (!args[0]) return send("No user given :(");
    const target = args[0].match(Constants.patterns.MENTION)[1];
    const split = content.replace(/\s+/g, ' ').trim().split(" ");
    let reason = split.slice(2, split.length).join(" ");
    if (reason == "") reason = "None";
    const user = gMember(target).user;
    if(user.id==bot.user.id) return send(`NO!!`);

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
        return send(`No bans for you, <@${used.id}>!`);
    }
    // console.log("Target: "+target);
    if (neko.indexOf(user.id) >= 0) {
      setInterval(() => {reply('kill yourself');}, 50);
      return;
    }
    let emb = new Discord.RichEmbed()
      .setAuthor("Ban Notice!")
      .setTitle(`You were banned from the server: ${guild.name}!`)
      .setColor(9109504)
      .setThumbnail(Constants.images.WARNING)
      .addField("Ban reason: ", `${reason}`, true);
    try{
      await user.sendEmbed(emb);
    } catch (err) { console.error(`Error of dming User: ${err}`); }

    const usernm = user.username;

    reply(`User banned successfully!`);

    channel.createWebhook("Mee6 (!help)", Constants.avatars.MEE6)
      .then (whook => whook.edit('Mee6 (!help)', Constants.avatars.MEE6))
      .then(hook => hook.sendMessage(`**${usernm}** left`)
        .then(m => { hook.delete(); })
        .catch(console.error)
      );
  }
};
