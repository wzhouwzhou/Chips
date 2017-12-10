const google = require('google');

module.exports = {
  name: 'google',
  func(msg, { send, args, author, Discord, member }) {
    google.resultsPerPage = 5;
    google.protocol = 'https';

    google(args, (err, res) => {
      if (err) return send(err);

      const embed = new Discord.MessageEmbed()
        .setColor(member ? member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`)
        .setTitle(`Search Result for: ${args.join(' ')}`)
        .setFooter(`Requested by: ${author.tag}`);

      for (const link of res.links) {
        embed.addField(`**Title:** ${link.title}`, `**Link Description** ${link.description}\n**Link:** ${link.link}`);
      }
      return send(embed);
    });
  },
};
