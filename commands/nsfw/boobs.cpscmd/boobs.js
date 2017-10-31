const got = require('got');
getBoobs = callback => {
  got(`http://api.oboobs.ru/boobs/noise/${_.random(100, 10732)}`).then(res => {
    try {
      let length = JSON.parse(res.body).length;
      callback(undefined, JSON.parse(res.body)[_.random(0, length)].preview);
    } catch (err) {
      callback(err);
    }
  }).catch(callback);
};

module.exports = {
  name: 'boobs',
  async func(msg, { member, send, channel }) {
    let emb = new Discord.MessageEmbed().setColor(member.displayColor);
    if (channel.nsfw) {
      return getBoobs((a, b) => {
        if (a) return send('Something went wrong...');
        b = `http://media.oboobs.ru/${b}`;
        emb.setImage(b);
        send(' ', { embed: emb });
      });
    } else { return 'No NSFW commands are allowed in this channel!'; }
  },
};
