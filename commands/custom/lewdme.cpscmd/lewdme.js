exports.name = 'lewdme';
exports.func = async(msg, ctx) => {
  const { send, reply, guild, member, author, channel, Discord, Constants } = ctx;
  if (!guild || guild.id !== '373481656134270986') return true;
  const question = [`${author.tag}, are you at least 18 or older?`, 'Reply with __y__es or __n__o in 10 seconds.'];
  const embed = new Discord.MessageEmbed()
    .setTitle('Age Verification')
    .addField(...question)
    .setThumbnail(Constants.images.WARNING)
    .setColor(member.displayColor);
  await send(embed);
  let confirmed = false, agreed = false;
  const collector = channel.createMessageCollector(m => {
    if (m.author.id === author.id && /^(?:y(?:es)?)|(?:no?)$/i.test(m.content)) {
      m.channel.send('Choice accepted, one moment...');
      confirmed = true;
      agreed = /^(?:y(?:es)?)$/i.test(m.content);
      setTimeout(() => collector.stop(), 500);
      return true;
    }
    return false;
  }, { time: 10000 });
  return collector.on('end', async collected => {
    if (!confirmed) {
      return reply('Age Verification timed out');
    } else {
      let m = collected.first();
      if (m.author.id !== author.id) return false;
      if (agreed) {
        const role = guild.roles.get('386024134695583744') || guild.roles.find('name', 'NSFW');
        await member.addRole(role);
        return send('You now have access to the NSFW chats here!');
      } else {
        return m.reply("Ok, I won't add the NSFW role to you");
      }
    }
  });
};

exports.metadata = {
  category: require('../').category,
  description: 'This custom command allows you to gain access to NSFW channels!',
  usage: 'lewdme <no args>',
  example: 'lewdme',
  perms: [['global.custom.lewdme.*']],
};
