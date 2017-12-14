module.exports = {
  name: 'triggered',
  async func(msg, { send, author, member, Discord, channel }) {
    channel.startTyping();
    try {
      const result = await require('snekfetch').get('http://localhost:51001/api/triggered')
        .set('src', (msg.mentions.users.first() || author).displayAvatarURL({ format: 'png', size: 2048 }));
      send(new Discord.MessageEmbed()
        .setColor(member ? member.displayColor : 134984)
        .attachFiles([{ attachment: Buffer.from(result.body, 'base64'), name: 'image.gif' }])
        .setImage('attachment://image.gif')
        .setFooter(`Requested by: ${author.tag}`));
      return channel.stopTyping();
    } catch (err) {
      send('Triggered gif generation failed...');
      channel.stopTyping();
      throw err;
    }
  },
};
