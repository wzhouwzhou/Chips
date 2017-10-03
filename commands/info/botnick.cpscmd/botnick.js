module.exports = {
  name: "botnick",
  async func(msg, { send, guild, suffix }) {
    if(!guild)
     return send('You need to be in a server to use this!') 
    if(!suffix)
      return send('Nothing provided to set as my nick');
    if(!guild.me.hasPermission('CHANGE_NICKNAME'))
      return send('I do not have permission to change my own nickname!');
    if(suffix.length>32)
      return send('My nickname can only be a maximum of 32 characters in length!');
    await guild.me.setNickname(suffix);
    return send('Nickname set successfully!');
  }
};
