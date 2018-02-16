module.exports = {
  name: 'servericon',
  func(msg, { send, guild }) {
    if (!guild) {
      return send();
    } else {
      send(guild.iconURL({ format: 'png', size: 2048 }));
    }
  },
};

