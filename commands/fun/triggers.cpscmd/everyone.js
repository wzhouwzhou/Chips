const gifs = [
  'http://i0.kym-cdn.com/photos/images/original/001/256/969/543.jpg',
  'http://i3.kym-cdn.com/photos/images/facebook/001/242/548/f0f.jpg',
  'https://i.ytimg.com/vi/pAcf_VV8KmI/maxresdefault.jpg',
  'http://i3.kym-cdn.com/photos/images/original/001/243/406/73c.jpg',
  'http://i2.kym-cdn.com/photos/images/newsfeed/001/263/237/be8.gif',
  // 'http://i.imgur.com/sqaPWSV.gifv',
  'https://pbs.twimg.com/media/CgggRytUUAAmvT6.jpg',
  'https://cdn.discordapp.com/attachments/257895860757725186/367754148256415754/image.png',
  'https://cdn.discordapp.com/attachments/257895860757725186/367754967773216768/image.png',
  // 'https://imgur.com/a/2o1M0',
  'https://cdn.discordapp.com/attachments/360171866964623361/373629631074664448/FTB2stB.gif',
  'https://i.imgur.com/LjG0Xoy.png',
  'https://i.imgur.com/exh1dnR.png',
  'https://i.imgur.com/OakyLuW.png',
  'https://i.imgur.com/ZozhckF.png',
  'https://i.imgur.com/iYVav74.png',
  'https://i.imgur.com/SDD15Jf.png',
];


const a = require('nodecpp-test').arrays;

module.exports = {
  name: 'everyone',
  func(msg, { send, Discord }) {
    // Return send(a.sample(gifs));
    send(new Discord.MessageAttachment(a.sample(gifs), 'everyone.gif'));
  },
};
