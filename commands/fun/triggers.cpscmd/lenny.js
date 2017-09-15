const lenny = [
  "( ͡° ͜ʖ ͡°)",
  "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)"
];

module.exports = {
  name: "lenny",
  async func(msg, { send }) {
    return send(lenny[~~(lenny.length*Math.random())]);
  }
};
