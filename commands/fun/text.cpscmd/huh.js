const _ = require('lodash');

module.exports = {
  name: 'huh',
  func(msg, { send, suffix, channel }) {
    send(`${suffix}, H${[...new Array(_.random(1, 6))]
      .map(() => _.sample(['u', 'U'])).join``}${_.sample(['H', 'h'])}${_.shuffle(['!', '?']).join``}`);
  },
};
