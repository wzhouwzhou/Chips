module.exports = {
  name: 'servericon',
  func(msg, { send, guild }) {
    if (!guild) {
      return send();
    } else {
      send(new Discord.Attachment(guild.iconURL({ format: 'png', size: 2048}), 'file.png'));
    }
  },
};
