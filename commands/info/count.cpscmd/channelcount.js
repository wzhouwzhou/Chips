module.exports = {
  name: "membercount",
  async func(msg, { send, guild, channel }) {
    if(guild)
      return send(guild.channel.size);
    else return send('You must be in a server to use this!');
  }
};
