module.exports = {
  name: "channelcount",
  async func(msg, { send, guild, args }) {
    if(!guild)
      return send('You must be in a server to use this!');

    if (!args[0])
      return send(guild.channels.size + " channels.");

    if (args[0]==='text')
      return send(guild.channels.filter(c=>c.type==='text').size + " text channels.");

    if (args[0]==='voice')
      return send(guild.channels.filter(c=>c.type==='voice').size + " voice channels.");


  }
};
