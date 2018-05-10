/* eslint no-console: 'off' */
const snekfetch = require('snekfetch');
const twe = require('twemoji');
const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: 'big',
  async func(msg,
    {
      send,
      content,
      reply,
      prefix,
      Discord,
    }) {
    if (content.replace(new RegExp(`${prefix}big\\s*`), '').length !== 0) {
      let customR = /<:[\w\d_]+:\d+>/g;
      let str = content.match(customR);
      const emojis = new Set();
      let customRA = /<a:[\w_]+:\d+>/g;
      let astr = content.match(customRA);
      if (astr && astr[0]) {
        astr.forEach(e => {
          let id = e.match(/<a:[\w_]+:(\d+)>/)[1];
          emojis.add(`https://cdn.discordapp.com/emojis/${id}.gif`);
        });
      }
      if (str && str[0]) {
        str.forEach(e => {
          let id = e.substring(1 + e.lastIndexOf(':'), e.length - 1);
          emojis.add(`https://cdn.discordapp.com/emojis/${id}.png`);
        });
      }
      str = content.replace(customR, '');
      if (str && str[0]) {
        let parsed = twe.parse(str).toString().match(/src="([\w|\d|:|/|.]+")/gi);
        if (parsed && parsed[0]) {
          parsed.forEach(e => {
            emojis.add(e.substring('src="'.length, e.length - 1));
          });
        }
      }
      const entries = Array.from(emojis);
      if (emojis.size === 1) {
        const fetched = await snekfetch.get(entries[0]);
        if (!fetched || !fetched.body) return reply('No emoji image found');
        return send(' ', { files: [{ attachment: fetched.body }] });
      }

      if (emojis.size > 0) {
        const p = new Paginator(msg, {
          type: 'paged',
          embedding: true,
          image: entries,
          lockToggle: !0,
        }, Discord);
        try {
          return await p.sendFirst();
        } catch (err) {
          console.error(err);
          return reply('Something went wrong...');
        }
      }
      return reply('No emoji was given');
    }
    return reply('No emoji given');
  },
};
