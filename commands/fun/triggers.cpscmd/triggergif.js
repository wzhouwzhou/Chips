const _ = require('lodash');
const gifs = [
  'https://i.imgur.com/th1RDAK.gif',
  'https://i.imgur.com/BvVEdP0.gif',
  'https://i.imgur.com/JnXRZUf.gif',
  'https://i.imgur.com/HgT06sl.gif',
  'https://i.imgur.com/uCBhiRw.gif',
  'https://i.imgur.com/kTIU4TF.gif',
  'https://i.imgur.com/HrshEbg.gif',
  'https://i.imgur.com/0TEX5RH.gif',
  'https://i.imgur.com/9qv1xCD.gif',
];

module.exports = {
  name: 'triggergif',
  func(msg, { send }) {
    return send(gifs[_.random(0, gifs.length - 1)]);
  },
};
