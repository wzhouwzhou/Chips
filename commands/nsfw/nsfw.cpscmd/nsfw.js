module.exports = {
  name: 'nsfw',
  func(msg, { send, prefix, channel, member, Discord }) {
    if (channel.nsfw) {
      const list = [
        '**{}boobs** to get some boobs',
        '**{}ass** to get some ass',
        '**{}hentai** for hentai',
        '**{}rule34 <comma, separated, search>** to search on r34',
      ].join('\n').replace(/{}/g, prefix);

      return send(new Discord.MessageEmbed().setTitle('Nsfw commands').setDescription(list)
        .setColor(member ? member.displayColor : 12435));
    } else {
      return send(`You are not in a nsfw channel!`);
    }
  },
};
