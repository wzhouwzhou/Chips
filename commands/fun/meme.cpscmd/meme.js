const a = require('nodecpp-test').arrays;
const memes = [
  'https://i.imgur.com/ahpEz6W.png',
  'https://i.imgur.com/FSx5cwn.png',
  'https://i.imgur.com/FKRiLXA.png',
  'https://i.imgur.com/TEnYCPW.png',
];

module.exports = {
  name: 'meme',
  func(msg, { send, Discord }) {
    return send(new Discord.MessageAttachment(a.sample(memes)));
  },
};
