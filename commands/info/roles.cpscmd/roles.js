module.exports = {
    name: "roles",
    async func(msg, { send, guild }) {
      if(guild)
        return send(guild.roles.list);
      else return send('You must be in a server to use this!');
    }
  };
