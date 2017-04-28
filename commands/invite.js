module.exports = {
  name: "invite",
  async func(msg, { member, author }) {
    const used = member || author;
    used.send('**Chips Support: https://discord.gg/jj5FzF7**');
  }
};
