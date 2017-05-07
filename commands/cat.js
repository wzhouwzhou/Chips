const gifs = [
  "http://random.cat",
  "http://thecatapi.com/"
];

module.exports = {
  name: "cat",
  async func(msg, { send }) {
    return send(gifs[_.random(0,gifs.length-1)])
  }
};
