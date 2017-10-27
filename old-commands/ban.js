// Const Searcher = require(path.join(__dirname, '../handlers/Searcher'));
const EXPIRE = 10000;

module.exports = {
  name: 'ban',
  perm: ['global.server.ban'],
  customperm: ['BAN_MEMBERS'],
  async func(msg, { send, reply, member, author, content, args, channel, guild, gMember }) {
    let memberToUse;
    try { // Get mention:
      console.log('Trying to find user by mention..');
      if (!args[0]) return reply('Please specify a user to ban!');
      let target = args[0].match(Constants.patterns.MENTION)[1];
      if (!target) return reply('Please specify a valid user to ban!');
      memberToUse = gMember(target);
      if (memberToUse == null) return reply('Invalid member!');
      if (member.id == memberToUse.id) return reply("I can't let you ban yourself >.>");
    } catch (err) { // GMember failed:
      console.log(err);
      return reply('I like chips.');
    }

    let reason;
    if (args[1]) reason = content.substring(content.indexOf(args[1]));
    if (reason == null) reason = 'No reason provided.';

    const embed = new Discord.MessageEmbed();
    embed
      .setAuthor(`Ban confirmation - Banning ${memberToUse.user.tag}`, memberToUse.user.displayAvatarURL)
      .setColor('RED')
      .setDescription(reason || 'No reason')
      .setTimestamp(new Date())
      .setThumbnail(Constants.images.WARNING);
    let question = `"Do you want to ban ${memberToUse.displayName}?\nThis expires in 10 seconds. Type __y__es or __n__o.`;
    await send(question, { embed: embed });
    let confirmed = false, agreed = false;

    let collector = channel.createMessageCollector(m => {
      if (/^(?:y(?:es)?)|(?:no?)$/i.test(m.content)) {
        if (m.author.id == author.id) {
          m.reply('Choice accepted. Now processing...');
          confirmed = true;
          agreed = /^(?:y(?:es)?)$/i.test(m.content);
          setTimeout(_ => collector.stop(), 1000);
          return true;
        }
        // Else return m.reply ("Denied");
      }
    },
    { time: EXPIRE }
    );
    collector.on('collect', _ => _);
    collector.on('end', collected => {
      if (!confirmed) { return reply('Ban timed out'); } else {
        let m = collected.first();
        console.log(`[Ban]: Collected ${m.content}`);
        if (m.author.id != author.id) return;
        if (agreed) {
          if (!memberToUse.bannable) return reply("Uh oh! I can't ban this user! Perhaps I am missing perms..");

          console.log('[Ban] Banning...');
          let emb = new Discord.MessageEmbed()
            .setAuthor('Ban Notice!')
            .setTitle(`You were banned from the server: ${guild.name}!`)
            .setColor(9109504)
            .setThumbnail(Constants.images.WARNING)
            .addField('Ban reason: ', `${reason}`, true);
          client.users.fetch(memberToUse.id)
            .then(u => { u.send('Uh oh!', { embed: emb }); })
            .then(mes => {
              m.reply('Banning!');
              memberToUse.ban({ reason: `[BAN]: [Author]: ${m.author.tag} [Reason]: ${reason}` });
            })
            .catch(err => {
              m.reply('Could not dm the user, but banning anyway!');
              memberToUse.ban({ reason: `[BAN]: [Author]: ${m.author.tag} [Reason]: ${reason}` });
            });
        } else {
          console.log('[Ban] cancelled');
          m.reply('Ok, ban cancelled!');
        }
      }
    });
  },
};
