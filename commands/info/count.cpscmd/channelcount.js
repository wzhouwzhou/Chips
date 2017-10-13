module.exports = {
  name: "channelcount",
  async func(msg, { send, guild, args }) {
    if(!guild)
      return send('You must be in a server to use this!');
    const text = guild.channels.filter(c=>c.type==='text').size;
    const voice = guild.channels.filter(c=>c.type==='voice').size;
    const category = guild.channels.filter(c=>c.type==='category').size

    if (!args[0])
      return send(`${text} channels, ${voice} channels and ${category} categories!`);

    if (args[0]==='text')
      return send(text + " text channels.");

    if (args[0]==='voice')
      return send(voice + " voice channels.");
    
      if (~'cat category'.split(/\s+/).indexOf(args[0]))   
      return send(category + " categories.")


  }
};
