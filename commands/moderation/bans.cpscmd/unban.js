// Const Searcher = require(path.join(__dirname, '../handlers/Searcher'));
const EXPIRE = 10000;

module.exports = {
  name: 'unban',
  async func(msg, { send, reply, author, args, channel, guild }) {
    let memberToUse;
    try {
      if (!args[0]) return reply('Please specify a user to unban!');
      let target = args[0];
      if (isNaN(target.match(/\d+/))) return reply('Please specify a valid user to unban!');
      memberToUse = target.match(/\d+/);
      let temp = guild.members.get(target.match(/\d+/));
      if (temp != null) return reply("Target user is in this server! You can't unban them!");
      if (memberToUse == '') return reply('Invalid user!');
      if (memberToUse == memberToUse.id) return reply('Why would you even try this...');
    } catch (err) { // Something extremely weird has happened:
      console.log(err);
      return reply('I like chips.');
    }
    let dm = false;
    let reason;
    if (args[1]) {
      if (args[2] && args[2].toLowerCase() != 'dm') {
        reason = _.drop(args).join(' ');
        dm = true;
      } else { reason = _.drop(_.drop(args)).join(' '); }
    }

    if (reason == null) reason = 'No reason provided.';
    let user = null, found = false;
    try {
      user = await client.users.fetch(memberToUse);

      if (user) {
        console.log(`Unban target user found: ${user.id}`);
        found = true;
      }
    } catch (err) {
      console.error(err);
    }

    const embed = new Discord.MessageEmbed();
    embed
      .setAuthor(`Unban confirmation - Unbanning: ${found ? user.tag : memberToUse}`, found ? user.displayAvatarURL : client.user.displayAvatarURL)
      .setColor('RED')
      .setDescription(reason || 'No reason')
      .setTimestamp(new Date())
      .setThumbnail(Constants.images.WARNING);
    let question = `"Do you want to Unban <@${memberToUse}>?\nThis expires in 10 seconds. Type __y__es or __n__o.`;
    await send(question, { embed: embed });
    let confirmed = false, agreed = false;

    let collector = channel.createMessageCollector(m => {
      if (/^(?:y(?:es)?)|(?:no?)$/i.test(m.content)) {
        if (m.author.id == author.id) {
          m.channel.send('Choice accepted. Now processing...').then(m => setTimeout(() => m.delete()), 1000);
          confirmed = true;
          agreed = /^(?:y(?:es)?)$/i.test(m.content);
          setTimeout(() => collector.stop(), 1000);
          return true;
        }
      }
    },
    { time: EXPIRE }
    );
    collector.on('collect', _ => _);
    collector.on('end', collected => {
      if (!confirmed) { return reply('Unban timed out'); } else {
        let m = collected.first();
        console.log(`[Unban]: Collected ${m.content}`);
        if (m.author.id != author.id) return;
        if (agreed) {
          console.log('[Unban] Unbanning...');
          let emb = new Discord.MessageEmbed()
            .setAuthor('Unban Notice!')
            .setTitle(`You were unbanned from the server: ${guild.name}!`)
            .setColor(9109504)
            .setThumbnail(Constants.images.WARNING)
            .addField('Unban reason: ', `${reason ? reason : 'None provided'}`, true);
          client.users.fetch(memberToUse).then(async u => {
            try {
              if (dm) await u.send('Uh oh!', { embed: emb });
              await m.reply('Unbanning!');
              guild.unban(memberToUse.toString(), `[UNBAN]: [Author]: ${m.author.tag} [Reason]: ${reason}`);
            } catch (err) {
              console.log(err);
              if (dm) m.reply('Could not dm the user, but unbanning anyway!');
              guild.unban(memberToUse.toString(), `[UNBAN]: [Author]: ${m.author.tag} [Reason]: ${reason}`);
            }
          });
        } else {
          console.log('[Unban] cancelled');
          m.reply('Ok, unban cancelled!');
        }
      }
    });
  },
};
