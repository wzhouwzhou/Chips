const snekfetch = require('snekfetch');

module.exports = {
  name: 'lizard',
  async func(msg, { send }) {
		snekfetch.get('https://nekos.life/api/lizard').then((res) => {
		if (res.status !== 200) {
			return send('An error has occurred!');
		}

		send('', {
			embed: new RichEmbed()
				.setColor(member.displayColor)
				.setTitle('Random Lizards')
				.setDescription('This message will be deleted in 3 minutes')
				.setImage(res.body.url)
				.setTimestamp();
		}).then(msg.delete(180000));
		});
},
};
