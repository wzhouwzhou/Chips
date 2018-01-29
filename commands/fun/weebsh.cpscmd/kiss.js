const snek = require('snekfetch');

module.exports = {
  name: 'kiss',
  async func(msg, { member, send, channel, author, Discord, Constants }) {
    channel.startTyping();
    try {
      const target = msg.mentions.users.first() || author;

      const result = await snek.get(`${Constants.APIURL}kiss`)
        .set('Authorization', process.env.RETHINKPSWD);
      const buffer = result.body instanceof Buffer ? result.body : Buffer.from(result.body, 'base64');

      send(new Discord.MessageEmbed()
        .setColor(member ? member.displayColor : 134984)
        .attachFiles([{ attachment: buffer, name: 'image.gif' }])
        .setImage('attachment://image.gif')
        .setTitle(`${target.tag} was kissed by ${target.id === author.id ? 'Chips' : author.tag}!`));
      return channel.stopTyping();
    } catch (err) {
      send('No kisses were given ;-; ...');
      channel.stopTyping();
      throw err;
    }
  },
};
