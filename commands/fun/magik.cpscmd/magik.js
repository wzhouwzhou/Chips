const snek = require('snekfetch');
const cache = new Map;

module.exports = {
  name: 'magik',
  async func(msg, { member, send, channel, author, Discord, Constants }) {
    channel.startTyping();
    try {
      const target = msg.mentions.users.first() || author;
      const hash = target.avatar || target.id;
      if (!cache.has(hash)) {
        const result = await snek.get(`${Constants.APIURL}magik`)
          .set('Authorization', process.env.RETHINKPSWD)
          .set('src', target.displayAvatarURL({ format: 'png', size: 2048 }));
        const buffer = result.body instanceof Buffer ? result.body : Buffer.from(result.body, 'base64');
        cache.set(hash, buffer);
      }

      send(new Discord.MessageEmbed()
        .setColor(member ? member.displayColor : 134984)
        .attachFiles([{ attachment: cache.get(hash), name: 'image.png' }])
        .setImage('attachment://image.png')
        .setTitle(`<:kannawoah:360404231334920192> look at ${(msg.mentions.users.first() || author).tag}`)
        .setFooter(`Requested by: ${author.tag}`));
      return channel.stopTyping();
    } catch (err) {
      send('Magik avatar generation failed...');
      channel.stopTyping();
      throw err;
    }
  },
};
