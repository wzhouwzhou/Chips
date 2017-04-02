module.exports = {
  name: "ban",
  async func(msg, { send, member }) {
    send(`NO bans 4 U ${member.displayName}`);
  }
};