const neko = [
  '265015624252653568', // Arkhalis
  '240651964424126464', // Loaf
  '259209114268336129', // Willyz
  '242366901194457088', // Wowie
  '270834390643376129', // Harbinger
  '213312750703607808', // Zalgo
  '220182743126900737', // Garhu5
  '278734113735966720', // Pie
  '223811504833691648', // Nolife
  '208736038577897473', // Xanthi
  '279270217417228288', // Abhinav
  '220951507070222337', // Gotem
  '259287315044630528', // Apex
  '90647484623261696', // Hero
  '237270037528969218', // Arx
  '292971521159200768', // JTJosh, not a neko but wanted immunity lol
  '279959411693322241', // TheGamingBolt ^
];

const ex = {
  name: '-ban',
  perm: ['global.server.-ban'],
  async func(msg, { send, member, author, content, channel, guild, args, gMember, Discord, reply, bot }) {
    const used = member || author;

    if (!args[0]) return send('No user given :(');
    const target = args[0].match(Constants.patterns.MENTION)[1];
    const split = content.replace(/\s+/g, ' ').trim().split(' ');
    let reason = split.slice(2, split.length).join(' ');
    if (reason == '') reason = 'None';
    const user = gMember(target).user;
    if (user.id == bot.user.id) return send(`NO!!`);
    if (!used.hasPermission('BAN_MEMBERS')) {
	    switch (used.id) {
	      case Constants.users.WILLYZ:
	      case Constants.users.PGSUPER:
	      case Constants.users.ZALGO:
	      case Constants.users.XZLQ:
	      case Constants.users.KONEKO:
	      case Constants.users.NELYN:
	      case Constants.users.LOAF:
	      case Constants.users.ARX:
        case Constants.users.ASUNA:
	        break;
	      default:
	        return send(`No bans for you, <@${used.id}>!`);
	    }
    }
    // Console.log("Target: "+target);
    if (neko.indexOf(user.id) >= 0) {
      if (author.id != Constants.users.KONEKO && author.id != Constants.users.WILLYZ) {
      	setTimeout(() => { reply('go ban yourself'); }, 50);
        return;
      } else { console.log('-ban immunity override'); }
    }
    let emb = new Discord.MessageEmbed()
      .setAuthor('Ban Notice!')
      .setTitle(`You were banned from the server: ${guild.name}!`)
      .setColor(9109504)
      .setThumbnail(Constants.images.WARNING)
      .addField('Ban reason: ', `${reason}`, true);
    try {
      await user.send(' ', { embed: emb });
    } catch (err) { console.error(`Error of dming User: ${err}`); }

    const usernm = user.username;

    reply(`User banned successfully!`);

    channel.createWebhook('Mee6 (!help)', Constants.avatars.MEE6)
      .then(whook => whook.edit('Mee6 (!help)', Constants.avatars.MEE6))
      .then(hook => hook.send(`**${usernm}** left`)
        .then(m => { hook.delete(); })
        .catch(console.error)
      );
  },
};

module.exports = ex;
