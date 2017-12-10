const google = require('google');

module.exports = {
  name: 'google',
  func(msg, { send, args, author, Discord, member }) {
    google.resultsPerPage = 1;
    google.protocol = 'http';
    const nextCounter = 0;
    google(args, (err, res) => {
      if (err) console.log(err);
      for (let i = 0; i < res.links.length; ++i) {
        const link = res.links[i];
        const embed = new Discord.MessageEmbed()
          .setColor(member ? member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`)
          .setTitle(`Search Result for: ${args.join(' ')}`)
          .addField(`**Title:** ${link.title}`, `**Link Description** ${link.description}\n**Link:** ${link.link}`)
          .setFooter(`Requested by: ${author.tag}`);
        send(embed);
      }
    });
  },
};
