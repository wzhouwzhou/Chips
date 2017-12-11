const _ = require('lodash');

module.exports = {
  name: 'nerd',
  func(msg, { send }) {
    return send(`N${[...new Array(_.random(2, 7))]
      .map(() => _.sample(['e', 'E'])).join``}${[...new Array(_.random(1, 3))]
      .map(() => _.sample(['r', 'R'])).join``}${[...new Array(_.random(1, 4))]
      .map(() => _.sample(['d', 'D'])).join``}${[...new Array(_.random(1, 2))]
      .map(() => _.sample(['!', '1'])).join``}!`);
  },
};
