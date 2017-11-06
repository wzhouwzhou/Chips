const qs = require('querystring');
const snek = require('snekfetch');

const api = 'http://api.giphy.com/v1/gifs/random';
const api_key = process.env.GIPHYKEY;

module.exports = {
  name: 'giphy',
  async func(msg, { send, suffix, Discord }) {
    const tags = suffix.replace(/,/g, '+');
    const opts = {
      api_key,
      format: 'json',
      limit: 1,
      rating: 'r',
    };
    if (tags.length > 0) opts.tag = qs.escape(tags);
    try {
      const result = await snek.get(`${api}?${qs.stringify(opts)}`);
      if (result.status !== 200) throw new Error(`Status ${result.status}`);
      const { id } = result.body.data;
      console.log(`Gif found at: https://media.giphy.com/media/${id}/giphy.gif`);
      return send(`https://media.giphy.com/media/${id}/giphy.gif`);
    } catch (err) {
      send('No images found, try some different tags. Make sure to separate them with commas');
      throw err;
    }
  },
};
