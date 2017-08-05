module.exports = {
  name: "undeafen",
perm:['global.server.voicemoderation'],
    customperm:['DEAFEN_MEMBERS'],
  async func(msg, { send }) {
chalk = require(`chalk`); console.log(chalk.bold.bgBlue.green(msg.member.user.tag+" ")+chalk.bgWhite.red(msg.member.user.id+" ")+chalk.black.bgWhite(msg.guild.id)+chalk.cyan(" [VoiceUnDeafen] "));
let member = msg.mentions.members.first();
if(!member) 
return msg.reply("Please mention a valid member of this server");
if (msg.channel.type  === "voice")
if (member.deaf("false"))
return guild.channel.send(`${member} isn't deafened!!`);
 else {
return member.setDeafen("false");
then.guild.channel.send(`${member} was undeafened successfully!`)
}
};
