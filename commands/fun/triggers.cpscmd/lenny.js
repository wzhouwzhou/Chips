const lenny = [
  '( ͡° ͜ʖ ͡°)',
  '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)',
  'https://i.imgur.com/P8dHrF9.gif',
  'https://i.imgur.com/svNztwx.gif',
  'https://i.imgur.com/0VgpGVM.gif',
  'https://i.imgur.com/0daFo5U.gif',
  'https://www.tenor.co/uhvl.gif',
  'https://www.tenor.co/IEEk.gif',
  'https://www.tenor.co/vb3T.gif',
  'https://giphy.com/gifs/lenny-YcTRRbkZLELny',
];


const a = require('nodecpp-test').arrays;

module.exports = {
  name: 'lenny',
  async func(msg, { send, channel }) {
    channel.startTyping();
    send(a.sample(lenny));
    channel.stopTyping();
  },
};
