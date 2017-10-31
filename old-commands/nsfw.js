module.exports = {
  name: 'nsfw',
  perm: ['server.nsfw'],
  async func(msg, { send, prefix, channel }) {
    if (channel.nsfw) {
      return send(`**NSFW commands:**
  **{}boobs** to get some boobs
  **{}ass** to get some ass`.replace(/{}/g, prefix));
    } else { return send(`You are not in a nsfw channel!`); }
  },
};
