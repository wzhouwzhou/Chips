module.exports = {
  name: 'tdl',
  async func(msg, { send, Discord }) {
    const embed = new Discord.MessageEmbed().setAuthor('The_dark_lurch#1306', `https://cdn.discordapp.com/avatars/270175244906397697/a_e512fc13b8d35f8eabe8bc2f364a3611.gif?size=2048`).setTitle('')
      .setDescription('The first Donator of Chips, :heart: The Dark Lurch! :3')
      .setColor(16776960);
    send('', { embed });
  },
};
