module.exports = {
  name: "addemoji",
  async func(msg, { send, args, member, guild }) {

    if(!member.hasPermission('MANAGE_EMOJIS'))
      return send('no');

    if (!args[0])
      return reply("No emoji name given :(");

    let name = args[0];

    if(!args[1])
      return send('no url');

    const emojiurl = (args[1].match(/^(https?:\/\/[^.]+\.[^]+)$/)||[0,null])[1];

    if(!args[1].match(/^https?:\/\/[^.]+\.[^]+$/))
      return send("ensure you've given a url");

    let emoji;
    try {
      emoji = await guild.createEmoji(emojiurl, name);
      send(`Created new emoji with name ${emoji.name}!`);
    }catch(err){
      send('The emoji could not be created…');
      throw err;
    }
  }
};
