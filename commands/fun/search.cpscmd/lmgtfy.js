const engines = new Map([
  ['google', null],
  ['bing', 'b'],
  ['yahoo', 'y'],
  ['aol', 'a'],
  ['ask', 'k'],
  ['duck', 'd'],
]);
const reg = new RegExp(`${Array.from(engines.keys()).map(e => _.escapeRegExp(e)).join('|')}`, 'i');

const qs = require('querystring');
const lmgtfy = (searchQ, engine = 'google') => {
  const qP = searchQ.split(/\s+/).map(e => qs.escape(e)).join('+');
  const prms = { iie: 1 }; if (engines.get(engine)) prms.s = engines.get(engine);
  return `http://lmgtfy.com/?${qs.stringify(prms)}&q=${qP}`;
};
const grammarJoin = require('../../../rewrite-all/src/deps/functions/grammarJoinF').default({ _ });
module.exports = {
  name: 'lmgtfy',
  func(msg, { reply, prefix, args, suffix }) {
    if (!args[0]) {
      return reply(
        [
          'Heres how you can use this command:',
          '{} [search engine] [query]',
          'Where [search engine] can be:',
          grammarJoin('google, bing, yahoo, aol, ask, duck (duckduckgo)'.split(/,\s*/g)),
        ].join('\n').replace(/{}/g, `${_.escapeRegExp(prefix)}${this.name}`));
    }
    if (args[0].match(reg) && args[1]) {
      query = suffix.substring(suffix.indexOf(args[1]));
    } else {
      query = suffix;
    }
    return reply(`Here's how you search this: ${lmgtfy(query, args[0] || null)}`);
  },
};
