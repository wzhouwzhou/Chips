const DERP = 'https://cdn.discordapp.com/attachments/257895860757725186/357683542442115074/derp_2.jpeg';
const snekfetch = require('snekfetch');

module.exports = {
  name: 'derp',
<<<<<<< HEAD
  async func(msg, { suffix, send, channel }) {
    if (suffix[0]) {
      channel.startTyping();
      send(suffix.replace(/[^\s]{1,2}/g, m => `${m[0]
        .toUpperCase()}${m[1] ? m[1].toLowerCase() : ''}`));
      return channel.stopTyping();
=======
  async func(msg, { args, send }) {
    if (args[0]) {
      return send(args.join(' ').replace(/[^\s]{1,2}/g, m => `${m[0]
        .toUpperCase()}${m[1] ? m[1].toLowerCase() : ''}`));
>>>>>>> parent of 1798b875... MASSIVE UPDATE || 25 COMMANDS HAVE .startTYPING! || FIXED TYPOS! || MADE SOME COMMANDS!! ||
    } else {
      return send('', { files: [{ attachment: (await snekfetch.get(DERP)).body }] });
    }
  },
};
