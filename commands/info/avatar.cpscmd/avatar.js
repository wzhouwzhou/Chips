const chalk = require(`chalk`);
const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: 'avatar',
  async func(msg, { send, Discord, author, guild, reply }) {
    console.log(chalk.bold.bgBlue.green(`${author.tag} `) + chalk.bgWhite.red(`${author.id} `) + chalk.black.bgWhite(guild.id) + chalk.cyan(' [Avatar] '));
    let targetmember = msg.mentions.members;
    if (!targetmember || targetmember.size < 1) {
      let AvatarImage = author.displayAvatarURL({ size: 2048 });
      let AvatarRegex = /^((?:https?:\/\/)cdn\.discordapp\.com\/avatars\/\d+\/\w+\.(?:jpe?g|png|gif|webp))\?size=\d+$/;
      const AvatarImageSelection = AvatarImage; // AvatarRegex.test(AvatarImage) ? AvatarImage.match(AvatarRegex)[1] : AvatarImage;

      const selftar = new Discord.MessageEmbed()
        .setTitle(`Avatar Image of ${author.tag} `, ``, true)
        .setColor(guild ? msg.member.displayColor : 71340)
        .addField('Avatar Link: ', `[Click Here](${AvatarImageSelection})`)
        .setImage(AvatarImageSelection);

      selftar.setFooter(`Requested by ${author.tag}`);

      return send({ embed: selftar });
    } else {
      const memberList = new Map();
      targetmember.forEach(member => {
        let AvatarImage = member.user.displayAvatarURL({ size: 2048 });
        let AvatarRegex = /^((?:https?:\/\/)cdn\.discordapp\.com\/avatars\/\d+\/\w+\.(?:jpe?g|png|gif|webp))\?size=\d+$/;
        const AvatarImageSelection = AvatarImage; // AvatarRegex.test(AvatarImage) ? AvatarImage.match(AvatarRegex)[1] : AvatarImage;
        memberList.set(member.id, {
          title: `Avatar Image of ${member.user.tag} `,
          page: ['Avatar Link: ', `[Click Here](${AvatarImageSelection})`],
          image: AvatarImageSelection,
        });
      });
      const pages = [], title = [], image = [];
      memberList.forEach(e => {
        pages.push([e.page]);
        title.push(e.title);
        image.push(e.image.replace(/\?size=\d+/g, ''));
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
