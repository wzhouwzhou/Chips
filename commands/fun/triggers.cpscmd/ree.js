const _ = require('lodash');
const gifs = [
  'https://www.tenor.co/Qpfx.gif',
  'https://www.tenor.co/JcPe.gif',
  'https://www.tenor.co/JiWJ.gif',
  'https://www.tenor.co/JiWK.gif',
  'https://www.tenor.co/Ppdd.gif',
  'https://www.tenor.co/SeXd.gif',
];

module.exports = {
  name: 'ree',
  func(msg, { send }) {
    return send(gifs[_.random(0, gifs.length - 1)]);
  },
};
