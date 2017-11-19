const convert = time => time && time.replace(/(0?(\d+)(:\d+:\d+))/,
  (a, ...e) => +e[1] < 13 ? `${e[0]} AM` : `${+e[1] - 12}${e[2]} PM`);

const needle = require('needle');
const qs = require('querystring');

const geobase = 'http://www.geonames.org/search.html';
const timebase = 'https://time.is/';

module.exports = {
  name: 'time',
  func(msg, { send, args, suffix }) {
    const q = args[0] ? 'EST' : suffix.replace(/@/g, '(at)');
    return needle.get(`${geobase}?q=${qs.escape(q)}&country=`, (err, resp) => {
      if (err) throw err;
      if (resp.statusCode !== 200) return send(`Status ${resp.statusCode}\nTime data could not be fetched for [${q}]`);

      if (~resp.body.indexOf('We have found no places with the name')) {
        return send(`We have found no places with the name of [${q}]`);
      }

      return needle.get(`${timebase}${qs.escape(q)}`, {
        follow: 1, headers: { 'Accept-Language': 'en-US' },
      }, (e, res) => {
        if (e) throw e;
        if (res.statusCode === 404) return send(`Time data could not be fetched for [${q}]`);

        let $$ = require('cheerio').load(res.body);
        const theplace = $$('div').filter((a, b) => $$(b).attr('id') === 'msgdiv').text();
        const thetime = convert($$('div').filter((a, b) => $$(b).attr('id') === 'twd').html());
        return send(`${theplace}is ${thetime}`);
      });
    });
  },
};
