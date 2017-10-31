module.exports = {
  name: 'tdl',
  async func(msg, { send, Discord }) {
    const embed = new Discord.MessageEmbed().setAuthor('The_dark_lurch#1306', 'https://i.imgur.com/HGgsuQU.png').setTitle('')
      .setDescription('The first Donator of Chips, :heart: The Dark Lurch! :3')
      .setColor(16776960);
    send('', { embed });
  },
};
