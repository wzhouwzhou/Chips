const reg = /^(https?:\/\/[^.]+\.[^]+)$/;

module.exports = {
  name: 'addemoji',
  async func(msg, { send, args, guild }) {
    if (guild.emojis.size >= 100) return send(`Maximum number of emojis reached (${guild.emojis.size})`);

    if (!args[0]) return send('No emoji name given :(');

    let name = args[0];

    if (!args[1]) return send('No url given :(');

    const emojiurl = (args[1].match(reg) || [0, null])[1];

    if (!args[1].match(reg)) return send("Ensure you've given a url!");

    let emoji;
    try {
      emoji = await guild.createEmoji(emojiurl, name);
      send(`Created new emoji with name ${emoji.name}!`);
    } catch (err) {
      send('The emoji could not be created…');
      throw err;
    }
  },
};
