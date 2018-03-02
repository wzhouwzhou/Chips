module.exports = {
  name: 'removeemoji',
  async func(msg, { send, args, guild }) {
    if (!args[0]) return send('No emoji name given :(');

    let name = args[0];
    let emote = guild.emojis.find('name', args[0]) ||
      (args[0].match(/<:\w+:(\d+)>/) || [,])[1];

    if (!emote) return send('no');

    let emoji;
    try {
      emoji = await guild.deleteEmoji(emote);
      send(`Deleted emoji with name ${emoji.name}!`);
    } catch (err) {
      send('The emoji could not be deleted…');
      throw err;
    }
  },
};
