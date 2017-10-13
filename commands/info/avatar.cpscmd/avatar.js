const chalk = require(`chalk`);
const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: "avatar",
  async func(msg, { send, Discord, author, guild, reply }) {
    let start = process.hrtime();
    console.log(chalk.bold.bgBlue.green(author.tag+" ")+chalk.bgWhite.red(author.id+" ")+chalk.black.bgWhite(guild.id)+chalk.cyan(" [Avatar] "));
    let targetmember = msg.mentions.members;
    if(!targetmember||targetmember.size<1){
      let hrTime = process.hrtime(start);

      const selftar = new Discord.MessageEmbed()
      .setTitle(`Avatar Image of ${author.tag} `, ``   , true)
      .setColor(guild?msg.member.displayColor:71340)
      .addField('Avatar Link: ', `[Click Here](${author.avatarURL({format: 'png', size: 2048})||author.displayAvatarURL({format: 'png', size: 2048})})`)
      .setImage(author.avatarURL({format: 'png', size: 2048}));

      let µs = false;
      let end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
      if(end<1){
        µs = true;
        end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
       }
       µs ? end += 'µs' : end += 'ms';
       selftar.setFooter(`--User Avatar lookup and calculations took ${(end)}.--`,``, true);

      return send({embed: selftar});
    }else {
      const memberList = new Map();

      targetmember.forEach(member=>{

        memberList.set(member.id,{
          title: `Avatar Image of ${member.user.tag} `,
          page: ['Avatar Link: ', `[Click Here](${member.user.avatarURL({format: 'png', size: 2048})||member.user.displayAvatarURL({format: 'png', size: 2048})})`],
          image: member.user.displayAvatarURL({format: 'png', size: 2048})
        });
      });
      const pages = [], title = [], image = [];
      memberList.forEach( e => {
        pages.push([e.page]);
        title.push(e.title);
        image.push(e.image.replace(/\?size=\d+/g,''));
      });

      if(pages.length===1){
        const avator = new Discord.MessageEmbed()
          .setTitle(title[0])
          .setColor(guild?msg.member.displayColor:71340)
          .addField(...pages[0][0])
          .setImage(image[0]);

        let hrTime = process.hrtime(start);
        let µs = false;
        let end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
        if(end<1){
          µs = true;
          end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
        }
        µs ? end += 'µs' : end += 'ms';
        avator.setFooter(`--User Avatar lookup took ${(end)}.--`,``, true);
        return send('', {embed: avator});
      }

      let hrTime = process.hrtime(start);
      let µs = false;
      let end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
      if(end<1){
        µs = true;
        end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
      }
      µs ? end += 'µs' : end += 'ms';

      const p = new Paginator ( msg,  {
        type:'paged',
        embedding: true,
        fielding: true,
        title,
        pages,
        image,
        text: `Avatar lookup took ${(end)}.`,
        }, Discord
      );
      try{
        return await p.sendFirst();
      }catch(err){
        console.error(err);
        return reply ('Something went wrong...');
      }
    }
  }
};
