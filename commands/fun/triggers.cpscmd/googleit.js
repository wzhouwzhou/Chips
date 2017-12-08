const a = require('nodecpp-test').arrays;
const urls = [
  'https://i.imgur.com/X20kba7.gif',
  'https://giphy.com/gifs/lastweektonight-hbo-google-3oKIPmM4hkQIf4p5T2',
];

module.exports = {
  name: 'googleit',
  async func(msg, { send }) {
    return send(a.sample(urls));
  },
};
