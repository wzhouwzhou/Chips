module.exports = {
  name: 'servericon',
  func(msg, { send, guild, Discord }) {
    if (!guild) {
      return send('You must be in a server to use this');
    } else {
      return send(new Discord.MessageAttachment(guild.iconURL({ format: 'png', size: 2048 }), 'file.png'));
    }
  },
};
