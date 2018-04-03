const snekfetch = require('snekfetch');

/*const getCat = () => new Promise((resolve, rej) => snekfetch.get('http://aws.random.cat/meow').then(async res => {
  try {
    if (res.status !== 200) return rej(new Error(`Status ${res.status}`));

    let f = res.body;
    if (!f || !f.file) return rej(new Error('File not found'));

    if (!~f.file.indexOf('png')) f = await getCat();
    return resolve(f);
  } catch (err) {
    return rej(err);
  }
}).catch(rej));*/

module.exports = {
  name: 'cat',
  async func(msg, { send, channel, Discord }) {
    channel.startTyping();
    try {
      snekfetch.get('https://thecatapi.com/api/images/get?format=src&type=gif,png,jpg').then(r=>send(new Discord.MessageAttachment(r.body, 'hi.gif')));
      return channel.stopTyping();
    } catch (err) {
      channel.stopTyping();
      await send('The cat photographer went missing!');
      throw err;
    }
  },
};
