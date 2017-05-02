const gifs = [
  "https://media.giphy.com/media/aNdsZjp5EKcM0/source.gif"
];

module.exports = {
  name: "eat",
  async func(msg, { send }) {
    return send(gifs[Math.floor(gifs.length*Math.random())]);
  }
};
