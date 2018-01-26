const snek = require('snekfetch');

module.exports = {
  name: 'neko',
  async func(msg, { member, send, channel, author, Discord, Constants }) {
    channel.startTyping();
    try {
      const result = await snek.get(`${Constants.APIURL}neko`)
        .set('Authorization', process.env.RETHINKPSWD);

      const buffer = result.body.data instanceof Buffer ? result.body.data : Buffer.from(result.body.data, 'base64');


      send(new Discord.MessageEmbed()
        .setColor(member ? member.displayColor : 134984)
        .attachFiles([{ attachment: buffer, name: 'image.png' }])
        .setImage('attachment://image.png')
        .setFooter(`Requested by: ${author.tag}`));
      return channel.stopTyping();
    } catch (err) {
      send('The Nekos went into hiding ...');
      channel.stopTyping();
      throw err;
    }
  },
};
