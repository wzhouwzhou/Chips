const cb = '```';

const randomCaps = str => {
  let str2 = [];
  for (const ind in str.split('')) str2.push(!_.random(0, 1) ? str[ind].toUpperCase() : str[ind].toLowerCase());
  return cb + str2.join('') + cb;
};

module.exports = {
  name: 'randomcaps',
  async func(msg, { reply, content, prefix }) {
    reply(randomCaps(content.substring(`${prefix}randomcaps `.length)));
  },
};
