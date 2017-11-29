module.exports = {
  name: 'removeemoji',
  async func(msg, { send, args, guild }) {
    if (!args[0]) return send('No emoji name given :(');

    let name = args[0];

    let emote = guild.emojis.find('name', `${name}`);

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
