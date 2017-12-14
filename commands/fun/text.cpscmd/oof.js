const _ = require('lodash');

module.exports = {
  name: 'oof',
  func(msg, { send }) {
    return send(`O${[...new Array(_.random(1, 6))]
      .map(() => _.sample(['o', 'O'])).join``}${_.sample(['f', 'F'])}${_.shuffle(['!', '1']).join``}`);
  },
};
