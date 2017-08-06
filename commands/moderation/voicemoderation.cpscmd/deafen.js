module.exports = {
  name: "deafen",
perm:['global.server.voicemoderation'],
    customperm:['DEAFEN_MEMBERS'],
  async func(msg, { send }) {
chalk = require(`chalk`); console.log(chalk.bold.bgBlue.green(msg.member.user.tag+" ")+chalk.bgWhite.red(msg.member.user.id+" ")+chalk.black.bgWhite(msg.guild.id)+chalk.cyan(" [VoiceDeafen] "));
let member = msg.mentions.members.first();
if(!member) 
return msg.reply("Please mention a valid member of this server");
if (msg.channel.type  === "voice")
if (member.deaf("true"))
return send(`${member} is already deafened!`);
 else {
return member.setDeafen("true");
send(`${member} was deafened successfully!`)
}
}
};
