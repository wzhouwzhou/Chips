module.exports = {
  name: "help",
  async func(msg, { send, prefix }) {
    send(`{}help for this help message.
{}ping for a pong.
{}aboooose or {}aboose for aboose.
{}ban for bans.
{}setoutput to let me speak.`.replace(/{}/g, prefix));
  }
};
