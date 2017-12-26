const _ = require('lodash');
module.exports = {
  name: 'aboosed',
  func(msg, { send }) {
    return send(`*Ab${'o'.repeat(_.random(2, 15 - 4))}sed!*`);
  },
};
