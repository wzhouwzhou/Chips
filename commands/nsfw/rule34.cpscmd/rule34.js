const get = require('snekfetch').get;
const parse = require('util').promisify(require('xml2js').parseString);
const qs = require('querystring');
const _ = require('lodash');

const base = 'https://rule34.xxx/index.php';
const _default_ = {
  page: 'dapi',
  s: 'post',
  q: 'index',
};

const get_query = async(i, ...tags) => {
  const search = `${qs.stringify(_default_)}&tags=${tags.map(tag => qs.escape(tag.trim())).join('+')}`;

  const resp = await get(`${base}?${search}`);
  if (resp.status !== 200) throw new Error(`Status ${resp.status}`);

  const r = await parse(resp.body);
  let url;
  for (let tries = 0; tries < 5; tries++) {
    if (!r || !r.posts) return null;
    const posts = r.posts.post;
    if (!posts || posts.length === 0) return null;
    const preitem = posts[_.random(0, Math.min(99, r.posts.$.count))];
    if (!preitem) continue;
    const item = preitem.$;
    if (i && item.tags.match(/(loli)|(shota)|(gore)|(pettanko)/i)) continue;
    const temp = item.file_url;

    if (!temp.match(/(webm)|(mp)/)) {
      url = temp;
      break;
    }
  }
  return url;
};

module.exports = {
  name: 'rule34',
  async func(msg, { send, suffix, author, member, args, Discord }) {
    if (!args[0]) return send('Nothing given to search');

    try {
      const tags = suffix.split(',');
      const url = await get_query(author.id !== '259209114268336129', ...tags);
      if (!url) return send('No results found after 5 tries after filtering');
      const ext = url.substr(url.lastIndexOf('.'));
      const embed = new Discord.MessageEmbed()
        .setTitle(`Rule34 Search: ${suffix}`)
        .attachFiles([{ attachment: `http:${url}`, name: `file${ext}` }])
        .setImage(`attachment://file${ext}`)
        .setColor(member ? member.displayColor : 407394)
        .setFooter(`Requested by ${author.tag}`)
        .setTimestamp();
      return send(embed);
    } catch (err) {
      send('An error occurred... perhaps no results were found');
      throw err;
    }
  },
};
