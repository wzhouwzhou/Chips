const gifs = [
  'https://i.imgur.com/07ZQawj.gif',
  'https://i.imgur.com/kfCKGje.gif',
];

module.exports = {
  name: 'eat',
  func(msg, { send }) {
    //return send(gifs[Math.floor(gifs.length * Math.random())]);
    return send(new Discord.MessageAttachment(gifs[Math.floor(gifs.length * Math.random())], 'hi.gif'));
  },
};
