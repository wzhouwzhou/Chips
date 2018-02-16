const snek = require('snekfetch');
const cache = new Map;

module.exports = {
  name: 'pinged',
  async func(msg, { member, send, channel, author, Discord, Constants }) {
    channel.startTyping();
    try {
      const target = msg.mentions.users.first() || author;
      const hash = target.avatar || target.id;
      if (!cache.has(hash)) {
        const result = await snek.get(`${Constants.APIURL}pinged`)
          .set('Authorization', process.env.RETHINKPSWD)
          .set('src', target.displayAvatarURL({ format: 'png', size: 2048 }));
        const buffer = result.body instanceof Buffer ? result.body : Buffer.from(result.body, 'base64');
        cache.set(hash, buffer);
      }

      send(new Discord.MessageEmbed()
        .setColor(member ? member.displayColor : 134984)
        .attachFiles([{ attachment: cache.get(hash), name: 'image.png' }])
        .setImage('attachment://image.png')
        .setTitle(`Oh a notification from ${(msg.mentions.users.first() || author).tag} <:__:394541754793197578>`)
        .setFooter(`Requested by: ${author.tag}`));
      return channel.stopTyping();
    } catch (err) {
      send('Pinged generation failed...');
      channel.stopTyping();
      throw err;
    }
  },
  metadata: {
    category: require('../').category,
    description: 'pinged!',
    usage: 'pinged (@ mention)',
    example: 'pinged @willy',
    perm: [['global.fun.image.pinged']],
    customperm: ['SEND_MESSAGES'],
  },
};
