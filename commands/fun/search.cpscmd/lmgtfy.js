const engines = new Map([
  ['google',null],
  ['bing','b'],
  ['yahoo','y'],
  ['aol','a'],
  ['ask','k'],
  ['duck','d'],
]);
const qs = require('querystring');
const lmgtfy = (searchQ, engine='google') => {
  const qP = searchQ.split(/\s+/).map(e=>qs.escape(e)).join('+');
  const prms = {'iie':1};  if(engines.get(engine)) prms.s=engines.get(engine);
  return 'http://lmgtfy.com/?'+qs.stringify(prms)+`&q=${qP}`;
};

module.exports = {
  name: "lmgtfy",
  async func(msg, { reply, prefix, args }) {
    if (!args[0])
      return reply(
      [
        'Heres how you can use this command:',
        `**${_.escapeRegExp(prefix)}** google [message content]`,
        `**${_.escapeRegExp(prefix)}** bing [message content]`,
        `**${_.escapeRegExp(prefix)}** yahoo [message content]`,
        `**${_.escapeRegExp(prefix)}** aol [message content]`,
        `**${_.escapeRegExp(prefix)}** ask [message content]`,
        `**${_.escapeRegExp(prefix)}** duck [message content]`,
      ].join('\n'));
    return reply(`Here's how you search this: ${lmgtfy(args[0])}`);
  }
};
