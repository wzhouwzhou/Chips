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
<<<<<<< HEAD
  async func(msg, { send }) {
    return send(a.sample(lenny));
=======
  func(msg, { send }) {
    return send(lenny[_.random(0, lenny.length - 1)]);
>>>>>>> 8076382a697988f4dd673f076b012c54c11f2f74
  },
};
