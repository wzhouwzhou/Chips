
const got = require('got');
getDog = (callback) => {
  got('https://random.dog/woof.json').then(res => {
    try {
      callback(undefined, JSON.parse(res.body).url);
    } catch (err) {
      callback(err);
    }
  }).catch(callback);
};

module.exports = {
  name: "dog",
  perm: ["server.dog"],
  async func(msg, { send }) {
    return getDog((a,b)=>send(b));
  }
};
