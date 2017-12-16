const _ = require('lodash');

module.exports = {
  name: 'eh',
  func(msg, { send, channel }) {
    channel.startTyping();
    send(`${_.sample(['E', 'e'])}${[...new Array(_.random(1, 6))]
      .map(() => _.sample(['h', 'H'])).join``}${_.shuffle(['!', '?']).join``}`);
      channel.stopTyping();
  },
};
