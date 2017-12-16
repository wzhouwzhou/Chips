const a = require('nodecpp-test').arrays;
const s1 = [
  ...'!'.repeat(5).split(''),
  '1',
  '¡',
  ...'?'.repeat(3).split(''),
  '¿',
  '@',
];

module.exports = {
  name: '!',
  func(msg, { send, suffix, channel }) {
    channel.startTyping();
    send(`${suffix} !${[...new Array(20)].map(() => a.sample(s1)).join('') + a.sample(['!', '?'])}`);
    channel.stopTyping();
  },
};
