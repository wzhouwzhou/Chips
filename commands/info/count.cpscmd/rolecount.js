module.exports = {
  name: "rolecount",
  async func(msg, { send, guild }) {
    if(guild)
      return send(`${guild.roles.size} roles.`);
    else return send('You must be in a server to use this!');
  }
};
