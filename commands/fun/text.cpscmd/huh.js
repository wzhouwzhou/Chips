const _ = require('lodash');

module.exports = {
  name: 'huh',
  func(msg, { send, suffix }) {
    return send(`${suffix && suffix.length > 0 ? suffix.replace(/$/, ',') : ''} H${[...new Array(_.random(1, 6))]
      .map(() => _.sample(['u', 'U'])).join``}${_.sample(['H', 'h'])}${_.shuffle(['!', '?']).join``}`, { disableEveryone: true });
  },
};
