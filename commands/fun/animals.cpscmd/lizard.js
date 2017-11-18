const snekfetch = require('snekfetch');

module.exports = {
  name: 'lizard',
  async func(msg, { send, Discord }) {
	snekfetch.get('https://nekos.life/api/lizard').then((res) => {
	if (res.status !== 200) {
		return send('An error has occurred!');
	}
	const embed = new  Discord.MessageEmbed()
			.setColor(member.displayColor)
			.setTitle('Random Lizards')
			.setDescription('This message will be deleted in 3 minutes')
			.setImage(res.body.url)
			.setTimestamp();
	send('', { embed: embed}).then(msg.delete(180000));
	});
},
};
