const google = require('google');

module.exports = {
  name: 'google',
  async func(msg, { send, author, Discord, member }) {
		google.resultsPerPage = 1;
		google.protocol = 'http';
		var nextCounter = 0;
		const args = message.content.split(/\s+/).slice(1);
		google(args, function (err, res){
			if (err) console.error(err);
			for (var i = 0; i < res.links.length; ++i) {
				var link = res.links[i];
				message.channel.send('', {
					embed: new RichEmbed()
						.setColor(config.discord.defaultColor)
						.setTitle(`Search Result for: ${args.join(" ")}`)
						.addField(`**Title:** ${link.title}`, `**Link Description** ${link.description}\n**Link:** ${link.link}`)
						.setFooter(`Requested by: ${message.author.tag}`)
				});
			}
		})
	}
};
