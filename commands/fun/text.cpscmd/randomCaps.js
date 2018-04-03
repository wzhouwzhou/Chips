const cb = '```';
const _ = require('lodash');

const randomCaps = str => {
  let str2 = [];
  for (const ind in str.split('')) str2.push(!_.random(0, 1) ? str[ind].toUpperCase() : str[ind].toLowerCase());
  return cb + str2.join('') + cb;
};

module.exports = {
  name: 'randomcaps',
  func(msg, { send, suffix }) {
    send(randomCaps(suffix));
  },
};
