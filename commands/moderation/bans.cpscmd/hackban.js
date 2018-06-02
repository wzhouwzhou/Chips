// Const Searcher = require(path.join(__dirname, '../handlers/Searcher'));
const EXPIRE = 10000;

module.exports = {
  name: 'hackban',
  async func(msg, { send, reply, author, args, channel, guild, client, prefix }) {
    let memberToUse;
    try {
      if (!args[0]) return reply('Please specify a user to hackban!');

      memberToUse = (args[0].match(/^<?@?!?(\d+)>?$/) || [null, null])[1];

      if (memberToUse == null || isNaN(memberToUse)) return reply('Please specify a valid user to hackban!');

      console.log(`Hackban ID received as: ${_.escapeRegExp(memberToUse)}`);

      if (memberToUse === author.id) return reply("I can't let you ban yourself >.>");

      if (!memberToUse) return reply('Targer user doesn\'t exist.');

      let temp = guild.members.get(memberToUse);
      if (temp) return reply(`Target user is in this server! Use ${_.escapeRegExp(prefix)}ban instead.`);

      if (!memberToUse[0] || memberToUse[0] === '') return reply('Invalid user!');
      if ((await guild.fetchBans()).has(memberToUse)) return reply('User is already banned!');
    } catch (err) { // Something extremely weird has happened:
      console.log(err);
      await reply('I like chips. (something errored)');
      throw err;
    }
    let dm = false;
    let reason = null;
    if (args[1]) {
      if (args[1].toLowerCase() === 'dm') {
        reason = _.drop(_.drop(args)).join(' ');
        dm = true;
      } else { reason = _.drop(args).join(' '); }
    }

    if (reason == null) reason = 'No reason provided.';
    let user = null, found = false;
    try {
      user = await client.users.fetch(typeof memberToUse === 'string' ? memberToUse : memberToUse + []);
      // Send('[Debug] user = '+user.toString());
      if (user != null) {
        console.log(`Hackban target user found: ${user.id}`);
        found = true;
      } else { return send(`I was not able to get a user with the id ${memberToUse}`); }
    } catch (err) {
      console.error(err);
      await send(`I was unable to get a user with the id ${memberToUse}`);
      throw err;
    }

    const embed = new Discord.MessageEmbed;
    embed
      .setAuthor(`Ban confirmation - Banning: ${found ? user.tag : memberToUse}`, found ? user.displayAvatarURL : client.user.displayAvatarURL)
      .setColor('RED')
      .setDescription(reason || 'No reason')
      .setTimestamp(new Date())
      .setThumbnail(Constants.images.WARNING);
    let question = `"Do you want to hackban <@${memberToUse}>?\nThis expires in 10 seconds. Type __y__es or __n__o.`;
    await send(question, { embed: embed });
    let confirmed = false, agreed = false;

    let collector = channel.createMessageCollector(m => {
      if (/^(?:y(?:es)?)|(?:no?)$/i.test(m.content)) {
        if (m.author.id === author.id) {
          m.channel.send('Choice accepted. Now processing...').then(m => m.delete({ timeout: 3000 }));
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
      if (!confirmed) { return reply('Ban timed out'); } else {
        let m = collected.first();
        console.log(`[Ban]: Collected ${m.content}`);
        if (m.author.id != author.id) return;
        if (agreed) {
          console.log('[Ban] Banning...');
          let emb = new Discord.MessageEmbed()
            .setAuthor('Ban Notice!')
            .setTitle(`You were banned from the server: ${guild.name}!`)
            .setColor(9109504)
            .setThumbnail(Constants.images.WARNING)
            .addField('Ban reason: ', `${reason ? reason : 'None provided'}`, true);
          client.users.fetch(memberToUse).then(async u => {
            try {
              if (dm) await u.send('Uh oh!', { embed: emb });
              await m.reply('Banning!');
              guild.ban(memberToUse.toString(), { reason: `[BAN]: [Author]: ${m.author.tag} [Reason]: ${reason}` });
            } catch (err) {
              console.log(err);
              if (dm) m.reply('Could not dm the user, but banning anyway!');
              guild.ban(memberToUse.toString(), { reason: `[BAN]: [Author]: ${m.author.tag} [Reason]: ${reason}` });
            }
          });
        } else {
          console.log('[Ban] cancelled');
          m.reply('Ok, ban cancelled!');
        }
      }
    });
  },
};
