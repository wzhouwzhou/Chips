module.exports = {
  name: "invite",
  perm: ["server.help"],
  async func(msg, { send, prefix }) {
    send(`My invite link: https://discordapp.com/oauth2/authorize?client_id=296855425255473154&scope=bot&permissions=2146958591`);
  }
};
