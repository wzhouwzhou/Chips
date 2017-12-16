module.exports = {
  name: 'aboosed',
  func(msg, { send, channel }) {
    channel.startTyping();
    send(`*Ab${'o'.repeat(_.random(2, 15 - 4))}sed!*`);
    channel.stopTyping();
  },
};
