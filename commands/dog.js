const gifs = [
  "https://random.dog/",
  "http://www.randomdoggiegenerator.com/"
];

module.exports = {
  name: "dog",
  async func(msg, { send }) {
    return send(gifs[_.random(0,gifs.length-1)])
  }
};
