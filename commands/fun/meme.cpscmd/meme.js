const a = require('nodecpp-test').arrays;
const memes = [
  'https://i.imgur.com/ahpEz6W.png',
  'https://i.imgur.com/FSx5cwn.png',
  'https://i.imgur.com/FKRiLXA.png',
  'https://i.imgur.com/TEnYCPW.png',
  'https://i.imgur.com/rkg0ikY.png',
  'https://i.imgur.com/gMLQvNM.png',
  'https://i.imgur.com/lQHKeLw.png',
  'https://i.imgur.com/kDWraAV.png',
];

module.exports = {
  name: 'meme',
  func(msg, { send, Discord }) {
    return send(new Discord.MessageAttachment(a.sample(memes)));
  },
};
