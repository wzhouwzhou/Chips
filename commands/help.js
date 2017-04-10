module.exports = {
  name: "help",
  async func(msg, { send, prefix }) {
    send(`{}help for this help message.
{}ping for a pong.
{}aboose for aboose.
{}ban for bans.
{}listen for terminal input (Deprecated)
{}setdm to set dmC
{}setoutput to let me speak.`.replace(/{}/g, prefix));
  }
};
