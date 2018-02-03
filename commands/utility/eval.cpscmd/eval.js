const whitelist = [
  Constants.users.WILLYZ,
  Constants.users.XZLQ,
  Constants.users.PGSUPER,
  Constants.users.EVILDEATHPRO,
  Constants.users.LUCAS,
  '302252773427249163',
  '286246724270555136',
];

const tokenRegex = new RegExp(client.token.replace(/\./g, '\\.').split('').join('.?'), 'g');
const token2Regex = new RegExp(h3client.token.replace(/\./g, '\\.').split('').join('.?'), 'g');
const cb = '```';
const util = require('util');

module.exports = {
  name: 'eval',
  async func(msg, { send, author, doEval, args }) {
    if (whitelist.indexOf(author.id) < 0) return console.log(`Prohibited access to eval to user ${author.id}`);
    if (args.length < 1) return send('Nothing to eval');
    let result = await send('Evaluating...');
    let start = process.hrtime();
    let evaled;
    try {
      evaled = await doEval(args.join(' ').replace('client.token', '`HNNNNNNGGHHHH`'));
    } catch (err) {
      return await result.edit('Error', { embed: (new Discord.MessageEmbed).setTitle(err.name).setDescription(`☠\u0010${cb}js\n${err.message.replace(/@/g, '(at)')}${cb}`) });
    }
    let r = typeof evaled !== 'string' ? require('util').inspect(evaled) : evaled;
    let hrTime = process.hrtime(start);
    let µs = false;
    end = hrTime[0] * 1000 + hrTime[1] / 1000000;
    if (end < 1) {
      µs = true;
      end = hrTime[0] * 1000000 + hrTime[1] / 1000;
    }
    µs ? end += 'µs' : end += 'ms';

    r = r.replace(tokenRegex, '[TOKEN]').replace(token2Regex, '[TOKEN]');

    let metrics = `\n\n--Evaluation took ${(end)}.--`;
    if (r.length + metrics.length > 1900) r = util.inspect(r, { depth: 1 });
    if (r.length + metrics.length > 1900) r = util.inspect(r, { depth: 0 });
    if (r.length + metrics.length > 1900) r = 'Output too long.';
    return await result.edit('Results', { embed: (new Discord.MessageEmbed).setTitle('Output').setDescription(`📤\u0010${cb}js\n${r}${cb}`)
      .setFooter(metrics) });
    // Await result.edit(`${r}${metrics}`);
  },
};
