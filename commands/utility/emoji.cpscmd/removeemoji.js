module.exports = {
  name: 'removeemoji',
  async func(msg, { send, args, member, guild }) {

    if (!args[0]) return send('No emoji name given :(');

    let name = args[0];

    let emoji;
    try {
      emoji = await guild.deleteEmoji(name);
      send(`Deleted emoji with name ${emoji.name}!`);
    } catch (err) {
      send('The emoji could not be deleted…');
      throw err;
    }
  },
};
