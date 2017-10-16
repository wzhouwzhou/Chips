const gifs = [
  "https://i.imgur.com/07ZQawj.gif",
  "https://i.imgur.com/kfCKGje.gif"
];

module.exports = {
  name: "eat",
  async func(msg, { send }) {
    return send(gifs[Math.floor(gifs.length*Math.random())]);
  }
};
