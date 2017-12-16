module.exports = {
  name: 'rekt',
  func(msg, { send, channel }) {
    channel.startTyping();
    send('Slain! https://giphy.com/gifs/TEcDhtKS2QPqE');
    channel.stopTyping();
  },
};
