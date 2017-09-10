const gifs = [
  "https://www.tenor.co/Fo14.gif",
  "https://www.tenor.co/Hrpz.gif",
  "https://www.tenor.co/ytYz.gif",
  "https://www.tenor.co/y6h0.gif",
  "https://giphy.com/gifs/tony-phillips-2kVi3pspuXXYA",
  "https://giphy.com/gifs/knuckles-echidna-enchilada-yaAbruchhQFFu",
  "https://giphy.com/gifs/vk7VesvyZEwuI",
  "https://www.tenor.co/viTW.gif"
];

module.exports = {
  name: "triggered",
  async func(msg, { send }) {
    return send(gifs[~~(gifs.length*Math.random())]);
  }
};
