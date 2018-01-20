const qs = require('querystring');
const snek = require('snekfetch');

const base = 'https://www.minecraftskinstealer.com/achievement/a.php?';
const default_options = {
  i: 2,
  h: 'Achievement Get!',
};

module.exports = {
  name: 'achievement',
  async func(msg, { suffix, send, Discord, args }) {
    if (!args[0]) return send('No achievement text given.');
    const opts = Object.assign({}, default_options, {
      t: suffix,
    });

    const url = `${base}${qs.stringify(opts)}`;

    const result = await snek.get(url);
    return send(new Discord.MessageAttachment(result.body, 'file.png'));
  },
  metadata: {
    category: require('../').category,
    description: 'Creates a minecraft achievement',
    usage: 'achievement [Achievement text]',
    example: 'achievement Join the Chips Support Server',
    perm: [['global.fun.text.achievement']],
  },
};
