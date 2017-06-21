
const got = require('got');
getCat = (callback) => {
  got('http://www.random.cat/meow').then(res => {
    try {
      callback(undefined, JSON.parse(res.body).file);
    } catch (err) {
      callback(err);
    }
  }).catch(callback);
};

module.exports = {
  name: "cat",
  perm: ["server.cat"],
  async func(msg, { send }) {
    return getCat((a,b)=>send(b));
  }
};
