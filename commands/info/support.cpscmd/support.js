module.exports = {
  name: "support",
  async func(msg, { member, author, send }) {
    const used = member || author;
    used.send('**Chips Support Server: https://discord.gg/jj5FzF7**');
    return send(`Support server link has been sent to ${used}'s direct messages!`);
  }
};
