module.exports = {
  name: "silence",
perm:['global.server.voicemoderation'],
    customperm:['MUTE_MEMBERS'],
  async func(msg, { send }) {
chalk = require(`chalk`); console.log(chalk.bold.bgBlue.green(msg.member.user.tag+" ")+chalk.bgWhite.red(msg.member.user.id+" ")+chalk.black.bgWhite(msg.guild.id)+chalk.cyan(" [VoiceMute] "));
let member = msg.mentions.members.first();
if(!member) 
return msg.reply("Please mention a valid member of this server");
if (msg.channel.type  === "voice")
if (member.mute("true"))
return guild.channel.send(`${member} is already muted!`);
 else {
return member.setMute("true");
then.guild.channel.send(`${member} was muted successfully!`)
}
}
};
