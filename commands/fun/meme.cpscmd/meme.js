const a = require('nodecpp-test').arrays;
const memes = [
  'https://i.imgur.com/ahpEz6W.png',
];

module.exports = {
  name: 'meme',
  func(msg, { send }) {
    return send(a.sample(memes));
  },
};
