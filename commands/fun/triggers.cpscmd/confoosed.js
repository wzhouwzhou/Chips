const _ = require('lodash');
module.exports = {
  name: 'confoosed',
  func(msg, { send }) {
    return send(`*Conf${'o'.repeat(_.random(2, 15 - 4))}sed!*`);
  },
};
