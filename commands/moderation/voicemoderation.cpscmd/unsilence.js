module.exports = {
  name: "unsilence",
perm:['global.server.voicemoderation'],
    customperm:['MUTE_MEMBERS'],
  async func(msg, { send }) {
chalk = require(`chalk`); console.log(chalk.bold.bgBlue.green(msg.member.user.tag+" ")+chalk.bgWhite.red(msg.member.user.id+" ")+chalk.black.bgWhite(msg.guild.id)+chalk.cyan(" [VoiceUnMute] "));
let member = msg.mentions.members.first();
if(!member) 
return msg.reply("Please mention a valid member of this server");
if (msg.channel.type  === "voice")
if (member.mute("false"))
return send(`${member} isn't muted!`);
 else {
return member.setMute("false");
then.send(`${member} was unmuted successfully!`)
}
}
};
