module.exports = {
  name: 'servericon',
  func(msg, { send, guild }) {
    if (!guild) {
      return send();
    } else {
      send(`${guild.iconURL}`);
    }
  },
};

