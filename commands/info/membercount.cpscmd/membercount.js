module.exports = {
  name: "membercount",
  async func(msg, { send, channel, guild }) {
    if(guild)
      return send(guild.member.size);
    else return send('You must be in a server to use this!');
  }
};