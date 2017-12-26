module.exports = {
  name: 'report',
  async func(msg, { guild, send, args, member, Discord, content, author }) {
    if (!guild.id === '394821147029536770') {
      return send('No access!');
    }

    if (!args[3]) {
      return send('`TAG ID SCREENSHOTLINK DESCRIPTION`');
    }
    if (args[3]) {
      let tag = args[0];
      let id = args[1];
      let link = args[2];
      let desc = content.substring(content.indexOf(args[3]));
      return send(new Discord.MessageEmbed()
        .setTitle('Report', ` Sent by ${author.tag}!`)
        .addField('Tag', `${tag}`, false)
        .addField('ID', `${id}`, true)
        .addField('ScreenshotLink | Proof', `${link}`, false)
        .addField('Description | Information', `${desc}`, true)
        .setColor(member.displayColor));
    }
  },
};

/* 1) Tag, LucasLSG#0260 args0
2) Id, 205608598233939970 1
3) Screenshot (If taken) 2
4) Description (DM Advertising, etc.) 3 */
