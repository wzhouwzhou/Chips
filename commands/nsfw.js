module.exports = {
  name: "nsfw",
  perm: ["server.nsfw"],
  async func(msg, { send, prefix }) {
    send(`**NSFW commands:**
  **{}boobs** to get some boobs
  **{}ass** to get some ass`.replace(/{}/g, prefix));
  }
};
