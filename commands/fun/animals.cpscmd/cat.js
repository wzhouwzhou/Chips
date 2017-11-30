const snekfetch = require('snekfetch');

const getCat = () => new Promise((resolve, rej) => snekfetch.get('http://www.random.cat/meow').then(async res => {
  try {
    let f = JSON.parse(res.body).file;
    if (!~f.indexOf('png')) f = await getCat();
    if (f) resolve(f); else rej(new Error('File not found'));
  } catch (err) {
    rej(err);
  }
}).catch(rej));

module.exports = {
  name: 'cat',
  async func(msg, { send, channel, Discord }) {
    channel.startTyping();
    try {
      await send(new Discord.MessageAttachment(await getCat(), 'cat.png'));
    } catch (err) {
      channel.stopTyping();
      await send('The cat photographer went missing!');
      throw err;
    }
  },
};
