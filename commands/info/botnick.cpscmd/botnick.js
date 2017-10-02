module.exports = {
    name: "botnick",
    async func(msg, { send, member, guild, suffix }) {
      if(!suffix)
        return send('Nothing provided to set as my nick');
      if(!guild.me.hasPermission('CHANGE_NICKNAME'))
        return send('I do not have permission to change my own nickname!');
    let nick;
    if(args[0])
      nick = content.substring(content.indexOf(args[0]));
        if(nick == null)
          return send('No nickname provided')

    guild.me.setNickname(nick)
  }
}
