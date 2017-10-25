const { URL } = require('url');

const ex= {
  name: "quote",
  async func(msg, {
    send,
    member,
    channel,
    args,
    Discord,
    reply
  }) {
    if (!args[0]){
      return reply('No message ID provided to quote.');
    }

    const color = member.displayColor;

    return channel.messages.fetch({ around: args[0], limit: 3 }).then(messages => {
      const quotee = messages.get(args[0]);

      const embed = new Discord.MessageEmbed()
        .setDescription(quotee.content || '\u200B')
        .setAuthor(`${quotee.author.username}#${quotee.author.discriminator}`, quotee.author.displayAvatarURL({format: 'png', size: 2048}))
        .setFooter(quotee.id)
        .setTimestamp(quotee.createdAt)
        .setColor(color);
      if (quotee.attachments.size){
        try {
          const url = new URL(quotee.attachments.first().url);
          const ext = path.extname(url.pathname);
          if (['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext)) embed.setImage(quotee.attachments.first().url);
        } catch (err) {
          if (err.message !== 'Invalid URL') throw err;
        }
      }

      return send(msg.content.slice(msg.content.search(args[0]) + args[0].length + 1), { embed });
    }).catch(err => {
      if (err.response && err.response.badRequest){
        return reply('Your message ID was invalid.');
      }
      console.error(err);
    });
  }
};

module.exports=ex;
