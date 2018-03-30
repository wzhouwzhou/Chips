const snekfetch = require('snekfetch');

module.exports = {
  name: 'fox',
  async func(msg, { send, channel, Discord }) {
    channel.startTyping();
    try {
      snekfetch.get('https://randomfox.ca/floof/').then(r => { send(new Discord.MessageAttachment(r.body.image, 'hi.png'));});
      return channel.stopTyping();
    } catch (err) {
      channel.stopTyping();
      await send('The fox photographer went missing!');
      throw err;
    }
  },
};
