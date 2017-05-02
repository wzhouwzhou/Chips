const gifs = [
  "https://cdn.discordapp.com/attachments/252525368865456130/306155422987845633/eec6ffb72e28cd667136ec95ab21e1b37bc35b10_hq.gif",
  "https://cdn.discordapp.com/attachments/292323883640684547/306399364044161024/5918f56a-fdf4-4130-8178-aabe84b0a0ea.gif",
  "https://cdn.discordapp.com/attachments/292323883640684547/306175999274647572/b8b4fa4db8da9fccb7aa79a1537b8650.gif",
  "https://cdn.discordapp.com/attachments/292323883640684547/306397902392262657/c015006f2a27053881c28f4d35b3432d.gif",
  "https://cdn.discordapp.com/attachments/292323883640684547/306407687783186432/anime_gif37.gif",
  "https://cdn.discordapp.com/attachments/292323883640684547/306407688441561088/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f.gif",
  "https://cdn.discordapp.com/attachments/292323883640684547/306407688441561089/tumblr_static_tumblr_static_7wficgfmy1gcwwwkwwcg8ocgw_640.gif",
  "https://cdn.discordapp.com/attachments/292323883640684547/306407689397731328/UshioD.gif"
];

module.exports = {
  name: "happy",
  async func(msg, { send }) {
    return send(gifs[Math.floor(gifs.length*Math.random())]);
  }
};
