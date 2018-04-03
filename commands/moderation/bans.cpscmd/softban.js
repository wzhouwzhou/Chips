const EXPIRE = 10000;

module.exports = {
  name: 'softban',
  async func(msg, { reply, member, author, content, args, channel, guild, gMember }) {
    let memberToUse;
    try { // Get mention:
      console.log('Trying to find user by mention..');
      if (!args[0]) return reply('Please specify a user to softban!');
      let target = args[0].match(Constants.patterns.MENTION)[1];
      if (!target) return reply('Please specify a valid user to softban!');
      memberToUse = gMember(target);
      if (memberToUse == null) return reply('Invalid member!');
      if (member.id == memberToUse.id) return reply("I can't let you softban yourself >.>");
      if (memberToUse.highestRole.position >= member.highestRole.position) return reply("That member's highest role is higher than or equal to the position to yours!");
    } catch (err) { // GMember failed:
      console.log(err);
      return reply('I like chips.');
    }

    let reason;
    if (args[1]) reason = content.substring(content.indexOf(args[1]));
    if (reason == null) reason = 'No reason provided.';
    let question = `Do you want to softban ${memberToUse.displayName}?\nThis expires in 10 seconds. Type __y__es or __n__o.`;

    const embed = new Discord.MessageEmbed();
    embed
      .setAuthor(`Softban confirmation - Softbanning ${memberToUse.user.tag}`, memberToUse.user.displayAvatarURL)
      .setColor('RED')
      .setTitle(question)
      .setDescription(reason || 'No reason')
      .setTimestamp(new Date())
      .setThumbnail(Constants.images.WARNING);
    await reply('', { embed });
    let confirmed = false, agreed = false;

    let collector = channel.createMessageCollector(m => {
      if (/^(?:y(?:es)?)|(?:no?)$/i.test(m.content)) {
        if (m.author.id == author.id) {
          m.channel.send('Choice accepted. Now processing...');
          confirmed = true;
          agreed = /^(?:y(?:es)?)$/i.test(m.content);
          setTimeout(() => collector.stop(), 1000);
          return true;
        }
        // Else return m.reply ("Denied");
      }
    },
    { time: EXPIRE }
    );
    collector.on('collect', _ => _);
    collector.on('end', collected => {
      if (!confirmed) { return reply('Softban timed out'); } else {
        let m = collected.first();
        console.log(`[Ban]: Collected ${m.content}`);
        if (m.author.id != author.id) return;
        if (agreed) {
          if (!memberToUse.bannable) return reply("Uh oh! I can't ban this user! Perhaps I am missing perms..");

          console.log('[Softban] Softbanning...');
          let emb = new Discord.MessageEmbed()
            .setAuthor('Softban Notice!')
            .setTitle(`You were softbanned from the server: ${guild.name}!`)
            .setColor(9109504)
            .setThumbnail(Constants.images.WARNING)
            .addField('Softban reason: ', `${reason}`, true);
          client.users.fetch(memberToUse.id)
            .then(u => { u.ssend('Uh oh!', { embed: emb }); })
            .then(() => {
              m.reply('Softbanning!');
              memberToUse.ban({ reason: `[SOFTBAN]: [Author]: ${m.author.tag} [Reason]: ${reason}` }, { days: 7 });
            })
            .catch(() => {
              m.reply('Could not dm the user, but softbanning anyway!');
              memberToUse
                .ban({ reason: `[SOFTBAN]: [Author]: ${m.author.tag} [Reason]: ${reason}` }, { days: 7 })
                .then(guild.unban(memberToUse.toString(), { reason: `[UNBAN]: [Author]: ${m.author.tag} [Reason]: ${reason}` }))
                .catch(err => m.channel.send(`Something went wrong…\n${err}`));
            });
        } else {
          console.log('[Softban] cancelled');
          m.reply('Ok, ban cancelled!');
        }
      }
    });
  },
};
