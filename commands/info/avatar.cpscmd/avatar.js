const chalk = require(`chalk`);

module.exports = {
  name: "avatar",
  async func(msg, { Discord, author, guild }) {
    let start = process.hrtime();
    console.log(chalk.bold.bgBlue.green(author.tag+" ")+chalk.bgWhite.red(author.id+" ")+chalk.black.bgWhite(guild.id)+chalk.cyan(" [Avatar] "));
    let targetmember = msg.mentions.members;

    if(!targetmember||targetmember.length<1)
      return msg.reply("Please mention a valid member of this server");

    else {
      const memberList = new Map();

      targetmember.forEach(member=>{

        memberList.set(member.id,{
          title: `Avatar Image of ${member.user.tag} `,
          page: ['Avatar Link: ', `[Click Here](${member.user.avatarURL})`],
          image: member.user.avatarURL
        });

        /*const avator = new Discord.RichEmbed()
          .setTitle(`Avatar Image of ${msg.member.user.tag} `, ``   , true)
          .setColor(msg.member.displayColor)
          .addField('Avatar Link: ', `[Click Here](${targetmember.user.avatarURL})`)
          .setFooter(`--User Avatar lookup took ${(end)}.--`,``, true)
          .setImage(targetmember.user.avatarURL);*/
      });
      const pages = [], title = [], image = [];
      memberList.forEach( e => {
        pages.push(e.page);
        title.push(e.title);
        image.push(e.image);
      });

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
        text:' ',
        pages,
        image,
        footer: `--User Avatar lookup took ${(end)}.--`,
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
