module.exports = {
  name: 'removeemoji',
  async func(msg, { Discord, author, send, args, guild }) {
    if (!guild) return send("Custom emojis don't exist in direct messages");
    if (!args[0]) return send('No emoji name given :(');

    let input = args[0];
    let emote = guild.emojis.find('name', input) ||
      guild.emojis.get(input.match(/<a?:[\w_]{2,}:(\d+)>/) || [][1]);

    if (!emote) return send('No emoji found');

    let emoji;
    try {
      emoji = await emote.delete(`${this.name} command executed by ${author.tag}`);
      let url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`;
      send(`Deleted emoji with name ${emoji.name}!`, {
        files: [
          new Discord.MessageAttachment(url, `${emoji.name}.${emoji.animated ? 'gif' : 'png'}`),
        ],
      });
    } catch (err) {
      send('The emoji could not be deleted…');
      throw err;
    }
  },
};
