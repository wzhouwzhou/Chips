const lenny = [
  "( ͡° ͜ʖ ͡°)",
  "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)",
  "https://giphy.com/gifs/lenny-5uZjTWWr8gK8U"
];

module.exports = {
  name: "lenny",
  async func(msg, { send }) {
    return send(lenny[_.random(0,lenny.length-1)]);
  }
};
