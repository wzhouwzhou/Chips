module.exports = {
  name: 'nsfw',
  async func(msg, { send, prefix, channel, member }) {
    if (channel.nsfw) {
      const list = [
        '**{}boobs** to get some boobs',
        '**{}ass** to get some ass',
        '**{}hentai** for hentai',
      ].join('\n').replace(/{}/g, prefix);

      send('', { embed: new Discord.MessageEmbed().setTitle('Nsfw commands').setDescription(list)
        .setColor(member ? member.displayColor : 12435) });
    } else { return send(`You are not in a nsfw channel!`); }
  },
};
