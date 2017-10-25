module.exports = {
    name: "emojicount",
    async func(msg, { send, guild, args }) {
      if(!guild)
        return send('You must be in a server to use this!');
      else return send(`${guild.emojis.size} emojis.`);  
       
      }
  };
