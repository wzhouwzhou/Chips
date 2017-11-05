module.exports = {
  name: 'masontcg',
  async func(msg, { send, Discord }) {
    const embed = new Discord.MessageEmbed()
      .setAuthor('MasonTheCoolGuy#8263', 'https://i.imgur.com/KkRF64b.png')
      .setTitle('')
      .setDescription('The third Patron of Chips, :heart: Mason! Thank you for showing your support!')
      .setTimestamp(new Date())
      .setImage('https://cdn.discordapp.com/avatars/345599637664694272/0426723921579f2d144a11943af121bf.png?size=2048')
      .setColor(0x33c9e0);
    await send('Loading......').then(m => setTimeout(() => m.delete({ timeout: 800 })), 1000);
    return send('', { embed });
  },
};
