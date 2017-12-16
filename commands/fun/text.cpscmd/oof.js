const _ = require('lodash');

module.exports = {
  name: 'oof',
  func(msg, { send, channel }) {
    channel.startTyping();
    send(`O${[...new Array(_.random(2, 7))]
      .map(() => _.sample(['o', 'O'])).join``}${[...new Array(_.random(4, 8))]
      .map(() => _.sample(['f', 'F'])).join``}${[...new Array(_.random(1, 9))]
      .map(() => _.sample(['!', '1'])).join``}!`);
    channel.stopTyping();
  },
};
