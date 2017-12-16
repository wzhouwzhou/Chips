module.exports = {
  name: 's',
  func(msg, { send, author, suffix, Constants, channel }) {
    if (author.id === Constants.users.WILLYZ ||
      author.id === Constants.users.EVILDEATHPRO ||
      author.id === Constants.users.LUCAS
    ) {
      channel.startTyping();
      msg.delete().catch(_ => _);
      send(suffix);
      channel.stopTyping();
    }
    return true;
  },
};
