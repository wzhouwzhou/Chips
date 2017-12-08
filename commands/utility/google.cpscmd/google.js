const google = require('google');

module.exports = {
  name: 'google',
  async func(msg, { send, args, author, Discord, member }) {
    google.resultsPerPage = 1;
    google.protocol = 'http';
    const nextCounter = 0;
    google(args, function (err, res){
      if (err) console.error(err);
      for (const i = 0; i < res.links.length; ++i) {
        const link = res.links[i];
        send('', {
          embed: new MessageEmbed()
            .setColor(member ? member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`)
            .setTitle(`Search Result for: ${args.join(" ")}`)
            .addField(`**Title:** ${link.title}`, `**Link Description** ${link.description}\n**Link:** ${link.link}`)
            .setFooter(`Requested by: ${author.tag}`)
        });
			}
		})
	}
};
