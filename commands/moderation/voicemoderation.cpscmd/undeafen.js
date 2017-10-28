const chalk = require(`chalk`);
chalk.enabled = true;

module.exports = {
  name: 'undeafen',
  async func(msg, { send, reply }) {
    console.log(chalk.bold.bgBlue.green(`${msg.member.user.tag} `) + chalk.bgWhite.red(`${msg.member.user.id} `) + chalk.black.bgWhite(msg.guild.id) + chalk.cyan(' [VoiceUnDeafen] '));
    let member = msg.mentions.members.first();
    if (!member) return reply('Please mention a valid member of this server');

    if (!member.voiceChannel) return reply('Member is not in a voice channel!');

    if (!member.serverDeaf) { return send(`${member} isn't server deafened!`); } else {
      member.setDeaf(false);
      return send(`${member} was un-serverdeafened successfully!`);
    }
  },
};
