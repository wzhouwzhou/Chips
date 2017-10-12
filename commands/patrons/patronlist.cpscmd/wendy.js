module.exports = {
  name: "wendy",
  async func(msg, { send, Discord }) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Jay(okay)#7885', "http://i.imgur.com/kAXq1HD.png") 
    .setTitle('').setDescription('The second Patron of Chips, :heart: Wendys! Aka Jay Okay!')
    .setTimestamp(new Date())
    .setImage("http://i.imgur.com/qGrvSGF.png")
    .setColor(0x0fa134);
      await send("Loading......").then(m => setTimeout(()=>m.delete(800)),1000);
      return send('', { embed });
  }
};
