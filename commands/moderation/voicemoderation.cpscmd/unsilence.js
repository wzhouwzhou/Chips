const chalk = require(`chalk`);
chalk.enabled = true;

module.exports = {
  name: 'unsilence',
  async func(msg, { send, reply }) {
    console.log(chalk.bold.bgBlue.green(`${msg.member.user.tag} `) + chalk.bgWhite.red(`${msg.member.user.id} `) + chalk.black.bgWhite(msg.guild.id) + chalk.cyan(' [VoiceUnMute] '));
    let member = msg.mentions.members.first();
    if (!member) return reply('Please mention a valid member of this server');

    if (!member.voiceChannel) return reply('Member is not in a voice channel!');

    if (!member.serverMute) { return send(`${member} isn't server muted!`); } else {
      member.setMute(false);
      return send(`${member} was un-servermuted successfully!`);
    }
  },
};
