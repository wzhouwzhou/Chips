module.exports = {
  name: "botnick",
  async func(msg, { send, guild, suffix }) {
    if(!suffix)
      return send('Nothing provided to set as my nick');
    if(!guild.me.hasPermission('CHANGE_NICKNAME'))
      return send('I do not have permission to change my own nickname!');
    return guild.me.setNickname(suffix);
  }
};
