const DERP = 'https://cdn.discordapp.com/attachments/257895860757725186/357683542442115074/derp_2.jpeg';
const snekfetch = require('snekfetch');

module.exports = {
  name: 'derp',
  async func(msg, { suffix, send, channel }) {
    if (suffix[0]) {
      channel.startTyping();
      send(suffix.join(' ').replace(/[^\s]{1,2}/g, m => `${m[0]
        .toUpperCase()}${m[1] ? m[1].toLowerCase() : ''}`));
      channel.stopTyping();
    } else {
      return send('', { files: [{ attachment: (await snekfetch.get(DERP)).body }] });
    }
  },
};
