const snek = require('snekfetch');

module.exports = {
  name: 'tickle',
  async func(msg, { member, send, channel, author, Discord, Constants }) {
    channel.startTyping();
    try {
      const target = msg.mentions.users.first() || author;

      const result = await snek.get(`${Constants.APIURL}tickle`)
        .set('Authorization', process.env.RETHINKPSWD);
      const buffer = result.body instanceof Buffer ? result.body : Buffer.from(result.body, 'base64');

      send(new Discord.MessageEmbed()
        .setColor(member ? member.displayColor : 134984)
        .attachFiles([{ attachment: buffer, name: 'image.gif' }])
        .setImage('attachment://image.gif')
        .setTitle(`${target.id === author.id ? 'Chips' : author.tag} just ticked ${target.tag} <:hehe:395884256653737984>`));
      return channel.stopTyping();
    } catch (err) {
      send('Nobody was around to tickle someone today 😬');
      channel.stopTyping();
      throw err;
    }
  },
};
