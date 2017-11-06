module.exports = {
  name: 'masontcg',
  async func(msg, { send, Discord }) {
    const embed = new Discord.MessageEmbed()
      .setAuthor('MasonTheCoolGuy#8263', 'https://i.imgur.com/1N3A07m.png')
      .setTitle('')
      .setDescription('The third Patron of Chips, :heart: Mason! Thank you for showing your support!')
      .setTimestamp(new Date())
      .setImage('https://i.imgur.com/Wlty9eI.png')
      .setColor(0x33c9e0);
    await send('Loading......').then(m => setTimeout(() => m.delete({ timeout: 800 })), 1000);
    return send('', { embed });
  },
};
