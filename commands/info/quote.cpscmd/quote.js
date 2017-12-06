const { URL } = require('url');

const ex = {
  name: 'quote',
  async func(msg, { send, member, channel, args, Discord, reply }) {
    if (!args[0]) {
      return reply('No message ID provided to quote.');
    }

    const color = member.displayColor;

    return channel.messages.fetch({ around: args[0], limit: 3 }).then(messages => {
      const quote = messages.get(args[0]);

      const embed = new Discord.MessageEmbed()
        .setDescription(quote.content || '\u200B')
        .setAuthor(`${quote.author.username}#${quote.author.discriminator}`, quote.author.displayAvatarURL({ format: 'png', size: 2048 }))
        .setFooter(quote.id)
        .setTimestamp(quote.createdAt)
        .setColor(color);

      if (quote.attachments.size) {
        try {
          const url = new URL(quote.attachments.first().url);
          const ext = path.extname(url.pathname);
          if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) embed.setImage(quote.attachments.first().url);
        } catch (err) {
          if (err.message !== 'Invalid URL') throw err;
        }
      }

      return send(msg.content.slice(msg.content.search(args[0]) + args[0].length + 1), { embed });
    }).catch(err => {
      if (err.response && err.response.badRequest) {
        return reply('Your message ID was invalid.');
      }
      console.error(err);
    });
  },
};

module.exports = ex;
