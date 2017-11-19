const snekfetch = require('snekfetch');

module.exports = {
	name: 'lizard',
	async func(msg, { send, author, Discord }) {
		snekfetch.get('https://nekos.life/api/lizard').then((res) => {
		if (res.status !== 200) {
			return send('An error has occurred!');
		}
		const color = "#"+((1<<24)*Math.random()|0).toString(16);
		const embed = new  Discord.MessageEmbed()
			.setColor(color)
			.setTitle('Random Lizards')
			.setDescription('This message will be deleted in 3 minutes')
			.setImage(res.body.url)
			.setFooter(`Requested by ${author.tag}`)
			.setTimestamp();
		send('', { embed: embed}).then(message.delete({ timeout: 3*60*1000 }));
		});
	},
};
