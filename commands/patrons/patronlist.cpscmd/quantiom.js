module.exports = {
  name: 'quantiom',
  async func(msg, { send, Discord }) {
    const embed = new Discord.MessageEmbed()
      .setAuthor('Quantiom#5566', 'https://i.imgur.com/fD4Wrtm.png')
      .setTitle('')
      .setDescription('The fourth Patron of Chips, :heart: Quantiom! Thank you for showing your support! It helps us greatly!')
      .setTimestamp(new Date())
      .setImage('https://i.imgur.com/97WGwcB.png')  //Thank you  Ene#3002 for centering this for me! Aka NightBot!
      .setColor(0x0066ba);
    await send('Loading......').then(m => setTimeout(() => m.delete({ timeout: 800 })), 1000);
    return send('', { embed });
  },
};
