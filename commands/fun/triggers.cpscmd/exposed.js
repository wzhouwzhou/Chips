module.exports = {
  name: 'exposed',
  func(msg, { send, channel }) {
    channel.startTyping();
    send(`*Exp${'o'.repeat(_.random(2, 15 - 4))}sed!*`);
    channel.stopTyping();
  },
};
