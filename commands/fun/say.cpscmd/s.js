module.exports = {
  name: 's',
  func(msg, { send, author, suffix, Constants }) {
    if (author.id === Constants.users.WILLYZ ||
      author.id === Constants.users.EVILDEATHPRO ||
      author.id === Constants.users.LUCAS ||
      author.id === Constants.users.HORIZON ||
      author.id === '166630166825664512'
    ) {
      // Antonio, 166..12

      msg.delete().catch(_ => _);
      return send(suffix, { disableEveryone: true });
    }
    return true;
  },
};
