module.exports = {
    name: "botnick",
    customperm:["MANAGE_NICKNAMES"],
    async func(msg, { send, guild, args }) {

    let nick;
    if(args[0])
      nick = content.substring(content.indexOf(args[0]));
        if(nick == null)  
          return send('No nickname provided')

    guild.me.setNickname(nick)

    }    

}
