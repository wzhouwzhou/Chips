module.exports = {
  name: 's',
  func(msg, { send, author, suffix, Constants }) {
    if (author.id === Constants.users.WILLYZ ||
      author.id === Constants.users.EVILDEATHPRO ||
      author.id === Constants.users.LUCAS
    ) {
      msg.delete().catch(_ => _);
      return send(suffix);
    }
    return true;
  },
};
