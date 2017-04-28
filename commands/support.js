module.exports = {
  name: "support",
  async func(msg, { member, author }) {
    const used = member || author;
    used.send('**Chips Support Server: https://discord.gg/jj5FzF7**');
  }
};
