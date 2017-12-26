module.exports = {
  name: 's',
  func(msg, { send, author, suffix, Constants }) {
    if (author.id === Constants.users.WILLYZ ||
      author.id === Constants.users.EVILDEATHPRO ||
      author.id === Constants.users.LUCAS
    ) {
      msg.delete().catch(_ => _);
<<<<<<< HEAD
      send(suffix);
=======
      return send(suffix);
>>>>>>> parent of 1798b875... MASSIVE UPDATE || 25 COMMANDS HAVE .startTYPING! || FIXED TYPOS! || MADE SOME COMMANDS!! ||
    }
    return true;
  },
};
