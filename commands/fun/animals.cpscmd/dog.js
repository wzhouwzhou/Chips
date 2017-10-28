const snekfetch = require('snekfetch');
const got = require('got');
const getDog = () => new Promise((resolve, rej) => {
  got('https://random.dog/woof.json').then(res => {
    try {
      const f = JSON.parse(res.body).url;
      f != null ? resolve(f) : rej('File not found');
    } catch (err) {
      rej(err);
    }
  }).catch(rej);
});

module.exports = {
  name: 'dog',
  async func(msg, { send, channel }) {
    channel.startTyping();
    try {
      await send('', { files: [{ attachment: (await snekfetch.get(await getDog())).body }] });
    } catch (err) {
      console.log(err);
      send('The dog photographer went missing!').catch(err => console.log(err));
    }
    channel.stopTyping();
  },
};

/*
GetDog = (callback) => {
  got('https://random.dog/woof.json').then(res => {
    try {
      callback(undefined, JSON.parse(res.body).url);
    } catch (err) {
      callback(err);
    }
  }).catch(callback);
};*/
