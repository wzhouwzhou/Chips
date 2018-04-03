/* eslint no-console: 'off' */
const chalk = require(`chalk`);
const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: 'avatar',
  async func(msg, { send, Discord, author, guild, reply }) {
    console.log(chalk.bold.bgBlue.green(`${author.tag} `) +
      chalk.bgWhite.red(`${author.id} `) +
      chalk.black.bgWhite(guild.id) +
      chalk.cyan(' [Avatar] '));
    let targetmember = msg.mentions.members;
    if (!targetmember || targetmember.size < 1) {
      let _ava = author.displayAvatarURL({ size: 2048 });
      const ava = _ava.replace(/\.webp$/, '.png');

      const selftar = new Discord.MessageEmbed()
        .setTitle(`Avatar Image of ${author.tag} `, ``, true)
        .setColor(guild ? msg.member.displayColor : 71340)
        .addField('Avatar Link: ', `[Click Here](${ava})`)
        .setImage(ava);

      selftar.setFooter(`Requested by ${author.tag}`);

      return send({ embed: selftar });
    } else {
      const memberList = new Map();
      targetmember.forEach(member => {
        let _ava = member.user.displayAvatarURL({ size: 2048 });
        const ava = _ava.replace(/\.webp$/, '.png');
        memberList.set(member.id, {
          title: `Avatar Image of ${member.user.tag} `,
          page: ['Avatar Link: ', `[Click Here](${ava})`],
          image: ava,
        });
      });
      const pages = [], title = [], image = [];
      memberList.forEach(e => {
        pages.push([e.page]);
        title.push(e.title);
        image.push(e.image);
      });

      if (pages.length === 1) {
        const avator = new Discord.MessageEmbed()
          .setTitle(title[0])
          .setColor(guild ? msg.member.displayColor : 71340)
          .addField(...pages[0][0])
          .setImage(image[0]);

        avator.setFooter(`Requested by ${author.tag}`);
        return send('', { embed: avator });
      }

      const p = new Paginator(msg, {
        type: 'paged',
        embedding: true,
        fielding: true,
        title,
        pages,
        image,
        footer: `Requested by ${author.tag}.`,
      }, Discord
      );
      try {
        return await p.sendFirst();
      } catch (err) {
        reply('Something went wrong...');
        throw err;
      }
    }
  },
};
