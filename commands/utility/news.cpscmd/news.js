
const s = require('snekfetch');
const qs = require('querystring');
const path = require('path');
const _ = require('lodash');

const fF = require('../../../rewrite-all/src/deps/functions/firstF').default({ _ });

const sort = 'publishedAt';
const base = 'newsapi.org/v2/';

const headlines = 'top-headlines';
const latest = 'everything';

module.exports = {
  name: 'news',
  async func(msg, { suffix, send, args, member, author, Discord }) {
    if (!args[0]) return send('Nothing to search!');

    let type, query, state;
    if (args[0].match(new RegExp(`^(?:top)?-*headlines$`, 'i'))) type = headlines;
    else if (args[0].match(new RegExp(`^${_.escapeRegExp(latest)}$`, 'i'))) type = latest;

    if (type) {
      query = suffix.substr(suffix.indexOf(' ') + 1).trim();
    } else {
      query = suffix;
      type = latest;
    }

    if (type === headlines) state = 'Top Headlines';
    else state = 'Latest articles';

    const url = path.join(base, type);
    const params = qs.stringify({
      q: query,
      sortBy: sort || latest,
      apiKey: process.env.NEWSAPI,
    });
    try {
      const results = await s.get(`https://${url}?${params}`);
      if (results.status !== 200) throw new Error(`Status code ${results.status}`);
      const articles = results.body.articles;
      const embed = new Discord.MessageEmbed;
      embed.setTitle(`Found ${articles.length} ${state}`)
        .setColor(member ? member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`)
        .setThumbnail(articles[0].urlToImage)
        .setFooter(`Requested by ${author.tag}`);
      for (const article of fF(articles, 3)) {
        embed.addField(`__${
          article.author || article.source.name || article.source.id
        }__ - ${(_s => _s.length > 50 ? `${fF(_s, 50)}...` : _s)(article.title)
        }`, `${
          article.description}\n**Published at:** ${
          new Date(article.publishedAt).toUTCString()
        }\n**url:** ${article.url
        }`
        );
      }
      return send(embed);
    } catch (err) {
      await send('An error occurred when fetching news…');
      throw err;
    }
  },
};
