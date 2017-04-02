module.exports = {
  name: "ping",
  async func(msg, { send, member }) {
    send(`pong! ${member.displayName}`);
    console.log("ping pong!" + member.user.username);
  }
};