const _ = require('lodash');

module.exports = {
  name: 'boi',
  func(msg, { send }) {
    return send(`O${[...new Array(_.random(2, 7))]
      .map(() => _.sample(['B', 'b'])).join``}${[...new Array(_.random(2, 3))]
      .map(() => _.sample(['O', 'o'])).join``}${[...new Array(_.random(1, 9))]
      .map(() => _.sample(['I', 'i'])).join``}!`);
  },
};
