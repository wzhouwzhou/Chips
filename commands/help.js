module.exports = {
  name: "help",
  async func(msg, { send, prefix }) {
    send(`{}help for this help message.
{}ping for a pong.
{}aboooose or {}aboose for aboose (any number of o's larger than two, s's, or e's).
{}setoutput to let me speak.`.replace(/{}/g, prefix));
  }
};