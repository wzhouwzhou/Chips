const _ = require('lodash');
const moment = require('moment');
require('moment-duration-format');

const gjF = require('../../../rewrite-all/src/deps/functions/grammarJoinF').default({ _ });
const fF = require('../../../rewrite-all/src/deps/functions/firstF').default({ _ });
const lF = require('../../../rewrite-all/src/deps/functions/lastF').default({ _ });

module.exports = {
  name: 'uptime',
  async func(msg, { client, Discord, send }) {
    const timesTotal = (await client.shard.broadcastEval(`process.uptime()`))
      .map(e => moment.duration(+e, 'seconds')
        .format('H&m&s.S')
        .replace(/^[^\d]*(\d+)?&?(\d+)?&?(\d+\.\d+)?[^]*$/i, (...args) => {
          const times = fF(lF(args, args.length - 1), args.length - 2).filter(t => t);
          const labels = lF(['hour', 'minute', 'second'], times.length);
          const final = times.map((t, i) => `${+t} ${labels[i]}${+t === 1 ? '' : 's'}`)
            .filter(s => !s.startsWith('0 '));
          return gjF(final, 'and');
        }));
    const embed = new Discord.MessageEmbed();
    timesTotal.forEach((time, shard) => embed.addField(`Shard ${shard + 1}`, time));
    return send(embed);
  },
};
