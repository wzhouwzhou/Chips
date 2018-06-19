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
  'https://i.imgur.com/SFXOmjR.png',
  'https://cdn.discordapp.com/attachments/274260111415836675/456987234885828608/Screen_Shot_2018-06-14_at_9.03.34_PM.png',
  'https://cdn.discordapp.com/attachments/274260111415836675/456987573861220384/Screen_Shot_2018-06-14_at_9.05.12_PM.png',
];

module.exports = {
  name: 'meme',
  func(msg, { send, Discord }) {
    return send(new Discord.MessageAttachment(a.sample(memes)));
  },
};
