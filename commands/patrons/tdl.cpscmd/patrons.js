module.exports = {
  name: "patrons",
  async func(msg, { send, Discord }) {
    const embed = new Discord.RichEmbed()
    .setAuthor('Here are all of the commands for Chips Patrons!') 
    .setTitle('A huge thanks to the following people for supporting Chips in the best way possible!')
    .setDescription('**-tdl** \n **-wendy**')
    .setTimestamp(new Date())
    .setColor(member.displayColor);
      await send("Loading......").then(m => setTimeout(()=>m.delete(200)),1000);
      return send('', { embed });
  }
};
