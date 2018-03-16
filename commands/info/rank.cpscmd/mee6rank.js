const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;
const snekfetch = require('snekfetch')
const fs = require('fs');
// Const m6r = require('../../../rewrite-all/src/deps/functions/mee6rankF').default({ needle: require('needle') });

const m6r = (gid, uid) => snekfetch.get(`https://api.chipsbot.me:2087/mee6?gid=${gid}&uid=${uid}`);

const ex = {
  name: 'mee6rank',
  async func(msg, { Constants, send, author, guild, args, gMember, reply, content, prefix, Discord }) {
    // send('Mee6rank is currently disabled due to issues interacting with mee6 api, apologies');

    let member = msg.member;
    const waitingE = new Discord.MessageEmbed().attachFiles(['loading.gif']).setAuthor('Loading...', 'attachment://loading.gif', 'http://chipsbot.tk')
      .setColor(msg.member.displayColor);
    const waiting = await send(' ', { embed: waitingE });

    console.log(`[Mee6Rank] Creating new searcher for guild ${guild.id}`);
    let options = { guild: guild };
    searchers[guild.id] = new Searcher(options.guild);
    let infobad = new Discord.MessageEmbed().setColor(member.displayColor).setFooter(new Date());

    let multiple = false;
    if (args[0]) {
      try { // Get mention:
        console.log('Trying to find user by mention..');
        let target = args[0].match(Constants.patterns.MENTION)[1];
        member = gMember(target);
        if (member.id != author.id) {
          try {
            let info = await permissions.checkMulti(msg, ['global.info.info.user.other']);
            console.log(`[Mee6Rank] ${info}`);
          } catch (err) {
            if (!member.hasPermission(this.metadata.customperm[0])) {
              console.log(`Rejected mee6rank other to ${used.id}`);
              return reply(err);
            }
          }
        } else {
          try {
            let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
            console.log(`[Mee6Rank] ${info}`);
          } catch (err) {
            if (!member.hasPermission(this.metadata.customperm[0])) {
              console.log(`Rejected mee6rank self to ${used.id}`);
              return reply(err);
            }
          }
        }
        if (!member) throw new Error('NotMemberMention');
      } catch (err) {
        member = content.substring(`${prefix}mee6rank `.length);
        let list = global.searchers[guild.id].searchMember(member);
        if (list.length > 1) multiple = true;
        else if (list.length < 1) return send(`User [${member}] not found!`);
        member = list[0];
        if (member.id !== author.id) {
          try {
            let info = await permissions.checkMulti(msg, ['global.info.info.user.other']);
          } catch (err2) {
            if (!member.hasPermission(this.metadata.customperm[0])) {
              console.log(`Rejected mee6rank other to ${used.id}`);
              return reply(err2);
            }
          }
        } else {
          try {
            let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
          } catch (err) {
            if (!member.hasPermission(this.metadata.customperm[0])) {
              console.log(`Rejected mee6rank self to ${used.id}`);
              return reply(err);
            }
          }
        }
      }
      const embed = await userData({ member, infobad, Constants });
      waiting.delete();
      await send(`${multiple ? '(multiple users were found, using the first one)' : ''}`, { embed });
      return true;
    } else {
      try {
        let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
        console.log(`[Mee6Rank] ${info}`);
      } catch (err) {
        if (!member.hasPermission(this.metadata.customperm[0])) {
          // Console.log(`Rejected mee6rank self to ${used.id}`);
          return reply(err);
        }
      }
      const embed = await userData({ member, infobad, Constants });
      waiting.delete();
      await send('', { embed });
      return true;
    }
  },
};

const userData = ({ Discord, member, infobad, Constants, guild }) => new Promise(async res => {
  const avatarURL = member.user.displayAvatarURL({ format: 'png', size: 2048 });

  const status = (() => {
    switch (member.presence.status) {
      case 'online': return 'online';
      case 'idle': return 'idle';
      case 'dnd': return 'dnd';
      default: return 'invis';
    }
  })();
  let trueMemC = guild.members.filter(m => !m.user.bot);
  const rp = snekfetch.get(`${Constants.APIURL}avaround`)
    .set('Authorization', process.env.RETHINKPSWD)
    .set('Status', status)
    .set('X-Data-Src', avatarURL);
  const datap = m6r(member.guild.id, member.id);
  let r, data;
  [r, data] = await Promise.all([rp, datap]);
  data = data.body;
  const membername = member.displayName.replace('@', '(at)');

  infobad.addField(`${member.user.tag} AKA ${membername}`, `${member.id}`);
  if (!data || data.xp === undefined || data.xp === null) {
    infobad.setDescription('User is not ranked!');
  } else {
    infobad.addField(`Ranked #${data.rank} / ${guild.members.size - trueMemC.size} members`, `Level ${data.lvl} with ${data.total_xp} total xp!`);
    infobad.addField(`Level xp: ${data.curr_xp}/${data.lvl_xp} (${data.xp_percent}%)`,
      `About ${data.estimated_msgs} msg(s) (${data.remaining_xp} xp) there to level ${data.lvl + 1}!`);
  }
  infobad.setColor(member.displayColor)
    .attachFiles([new Discord.MessageAttachment(r.body, 'image.png')])
    .setThumbnail('attachment://image.png');
  return res(infobad);
});

module.exports = ex;
