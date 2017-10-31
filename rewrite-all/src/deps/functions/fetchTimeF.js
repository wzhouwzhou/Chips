'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const convertT = require('24To12F.js');
const geonamesAPI = 'http://www.geonames.org/search.html?q=';
const timeAPI = 'https://time.is/';

exports.default = ({ needle, querystring, cheerio }) => (location = 'uk') => new Promise((res, rej) =>
  needle.get(
    `${geonamesAPI}${querystring.escape(location)}`,
    (err, resp) => {
      if (err) return rej(e);
      if (resp.statusCode !== 200) return rej(new Error(resp.statusCode));
      if (~resp.body.indexOf('We have found no places with the name')) return rej(null);

      needle.get(
        `${timeAPI}${querystring.escape(location)}`,
        { follow: 1 },
        (err2, res2) => {
          if (err2) return rej(err2);
          if (res.statusCode === 404) return rej(null);
          let $$ = cheerio.load(res2.body);
          const filtered = convertT($$('div').filter((a, b) => $$(b).attr('id') == 'twd').html());
          return filtered ? res(filtered) : rej(null);
        });
    })
)
;
