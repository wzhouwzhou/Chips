const chalk = require(`chalk`);
chalk.enabled = true;

module.exports = {
  name: 'deafen',
  async func(msg, { send, reply }) {
    console.log(chalk.bold.bgBlue.green(msg.member.user.tag+' ')+chalk.bgWhite.red(msg.member.user.id+' ')+chalk.black.bgWhite(msg.guild.id)+chalk.cyan(' [VoiceDeafen] '));
    let member = msg.mentions.members.first();
    if(!member) return reply('Please mention a valid member of this server');

    if(!member.voiceChannel) return reply('Member is not in a voice channel!');

    if (member.serverDeaf)
      return send(`${member} is already server deafened!`);
    else {
      member.setDeafen(true);
      return send(`${member} was deafened successfully!`);
    }
  }
};
