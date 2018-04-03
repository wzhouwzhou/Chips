const a = require('nodecpp-test').arrays;
const gifs = [
  'https://i.imgur.com/bpi5JOy.gif',
  'https://i.imgur.com/mHzRsnA.gif',
  'https://i.imgur.com/jFi89LY.gif',
  'https://i.imgur.com/rvko3Hc.gif',
  'https://i.imgur.com/utFBPqW.gif',
  'https://i.imgur.com/utFBPqW.gif',
];

module.exports = {
  name: 'hug2',
  func(msg, { send }) {
    return send(a.sample(gifs));
  },
};
