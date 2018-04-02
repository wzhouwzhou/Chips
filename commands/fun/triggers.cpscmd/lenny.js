const lenny = [
  '( ͡° ͜ʖ ͡°)',
  '( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)',
];

const lennyTwo = [
  'https://i.imgur.com/P8dHrF9.gif',
  'https://i.imgur.com/svNztwx.gif',
  'https://i.imgur.com/0VgpGVM.gif',
  'https://i.imgur.com/0daFo5U.gif',
  'https://media.giphy.com/media/C3CUJPTRqNk88/200.gif', //'https://www.tenor.co/uhvl.gif',
  //'https://www.tenor.co/IEEk.gif',
  //'https://www.tenor.co/vb3T.gif',
  'https://media.giphy.com/media/YcTRRbkZLELny/giphy.gif',
];

const a = require('nodecpp-test').arrays;

module.exports = {
  name: 'lenny',
  func(msg, { send }) {
    return send(a.sample(lenny), new Discord.MessageAttachment(a.sample(lennyTwo), 'hi.gif'));
  },
};
