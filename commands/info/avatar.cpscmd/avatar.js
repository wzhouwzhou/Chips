const chalk = require(`chalk`);

module.exports = {
  name: "avatar",
  async func(msg, { send, Discord }) {
    let start = (new Date).getTime();
    let member = msg.mentions.members.first();

    if(!member)
      return msg.reply("Please mention a valid member of this server");

    else {

      console.log(chalk.bold.bgBlue.green(msg.member.user.tag+" ")+chalk.bgWhite.red(msg.member.user.id+" ")+chalk.black.bgWhite(msg.guild.id)+chalk.cyan(" [Avatar] "));

      let hrTime = process.hrtime(start);
      let µs = false;
      let end = (hrTime[0] * 1000 + hrTime[1] / 1000000);
      if(end<1){
        µs = true;
        end = (hrTime[0] * 1000000 + hrTime[1] / 1000);
      }
      µs ? end += 'µs' : end += 'ms';

      const avator = new Discord.RichEmbed()
        .setTitle(`Avatar Image of ${msg.member.user.tag} `, ``   , true)
        .setColor(msg.member.displayColor)
        .addField('Avatar Link: ', `[Click Here](${msg.member.user.avatarURL})`)
        .setFooter(`--User Avatar lookup and calculations took ${(end)}.--`,``, true)
        .setImage(msg.member.user.avatarURL);

      return send('', {embed: avator});
    }
  }
};
