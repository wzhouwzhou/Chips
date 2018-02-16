module.exports = {
  name: 'servericon',
  func(msg, { send, guild }) {
    if (!guild) {
      return send();
    } else {
      send(new Discord.Attachment(guild.iconURL, 'file.png'));
    }
  },
};

