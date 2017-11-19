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
				.setDescription(`Requested by ${author.tag}`)
				.setImage(res.body.url)
				.setTimestamp();
		send('', { embed: embed});
		});
	},
};
