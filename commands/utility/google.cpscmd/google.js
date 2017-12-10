const google = require('google');

module.exports = {
  name: 'google',
  async func(msg, { send, suffix, author, Discord, member }) {
    google.resultsPerPage = 5;
    google.protocol = 'https';

    return google(suffix, (err, res) => {
      if (err) return console.error(err);

      const embed = new Discord.MessageEmbed()
        .setColor(member ? member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`)
        .setTitle(`Search Result for: ${suffix}`)
        .setFooter(`Requested by: ${author.tag}`);

      for (const link of res.links) {
        embed.addField(`**Title:** ${link.title}`, `**Link Description** ${link.description}\n**Link:** ${link.link}`);
      }
      return send(embed);
    });
  },
};
