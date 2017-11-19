const snekfetch = require('snekfetch');

module.exports = {
  name: 'lizard',
  async func(msg, { send, author, member, Discord }) {
    const res = await snekfetch.get('https://nekos.life/api/lizard');
    if (res.status !== 200) {
      send('An error occurred while spying on lizards!');
      throw new Error(`Status code ${res.status}`);
    }
    const color = member ? member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`;
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Random Lizards')
        .setDescription('This message will be deleted in 3 minutes')
        .attachFiles([
          new Discord.MessageAttachment(res.body.url || 'https://nekos.life/static/lizard/0118.png', 'lizard.png'),
        ])
        .setImage('attachment://lizard.png')
        .setFooter(`Requested by ${author.tag}`)
        .setTimestamp();
    return send(embed).then(m => m.delete({ timeout: 3 * 60 * 1000 }));
  },
};
