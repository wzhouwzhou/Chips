const needle = require('needle');

const getHentai = () => {
  const p = _.random(1, 486);
  const i = _.random(0, 9);
  return new Promise((res, rej) => {
    needle.get(`https://yande.re/post.json?tags=uncensored&limit=10&page=${p}`, (e, r) => {
      if (e) rej(e);
      if (r.statusCode != 200) rej(`Status ${r.statusCode}`);
      try {
        res(r.body[i].file_url);
      } catch (err) {
        rej(err);
      }
    });
  });
};

module.exports = {
  name: 'hentai',
  async func(msg, { send, member, Discord, channel }) {
    if (!channel.nsfw) return;

    try {
      let url, safe = false;
      for (let i = 0; i < 5; i ++) {
        url = await getHentai();
        if (!/(loli)|(shota)|(gore)|(pettanko)/i.test(url)) {
          safe = true;
          break;
        }
      }
      if (!safe) return send('No hentai images found after 5 tries of filtering...');

      const embed = new Discord.MessageEmbed().setColor(member ? member.displayColor : 13512).setImage(url);
      await send(embed);
    } catch (err) {
      console.error(err);
      if (err.startsWith('Status ')) return send('Hentai servers are down right now...');
      send('Could not fetch images...');
      throw err;
    }
  },
};
