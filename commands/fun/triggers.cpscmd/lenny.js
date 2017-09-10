const lenny = [
  "( ͡° ͜ʖ ͡°)",
  "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)",
  "(づ◕ ͜ʖ◕)づ",
  "୧ʘᨓʘ୨",
  "(งಠ‸ಠ)ง",
  "(∩ȍ∀ȍ)⊃━☆ﾟ.*"
];

module.exports = {
  name: "lenny",
  async func(msg, { send }) {
    return send(lenny[~~(lenny.length*Math.random())]);
  }
};
