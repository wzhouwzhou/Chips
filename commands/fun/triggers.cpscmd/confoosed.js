module.exports = {
  name: 'confoosed',
  func(msg, { send, channel }) {
    channel.startTyping();
    send(`*Conf${'o'.repeat(_.random(2, 15 - 4))}sed!*`);
    channel.stopTyping();
  },
};
