module.exports = {
  name: "support",
  async func(msg, { author, send, guild }) {
    if(guild) return send('This command must be used in dms with `-` as the prefix!').then(m=>m.delete(3000));
    const used = author;
    return used.send('**Chips Support Server: https://discord.gg/jj5FzF7**');
    //return send(`Support server link has been sent to ${used}'s direct messages!`);
  }
};
