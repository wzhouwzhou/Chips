const Handler = require('../../../rewrite-all/src/struct/music/MusicHandler.js').default;

const _handlers = new Map();
const _ = require('lodash');

module.exports = {
  _handlers,
  name: 'music',
  func(msg, { args, guild, client, member, channel, send, prefix, Discord }) {
    if (!args[0] || args[0] === 'help') {
      return send(new Discord.MessageEmbed().setTitle('Available actions').setDescription([
        `**${_.escapeRegExp(prefix)}${this.name} demo** to start the main music module, more instructions will follow.`,
        `**${_.escapeRegExp(prefix)}${this.name} radio** to see details about chips radio`,
      ].join('\n')));
    }
    if (args[0] === 'radio') {
      const l = ['monstercat', 'ncs', 'tgl', 'chillHop', 'lm', 'wqxr']
        .map(e => Object.keys(client[`${e}Channels`]).length)
        .reduce((a, e) => a + e, 0);

      return send(new Discord.MessageEmbed().setTitle('Chips radio (Beta™)').setDescription([
        '**Introducing Chips 24/7 radio!**\n',
        'Step 1: Have a voice channel with **`Chips Streams [Stream Name]`** in the name',
        'Valid streams to replace "[Stream name]" with are `The Good Life`, `Monstercat`, `NCS`, `Listen.moe`, `Chillhop`, or ' +
          '`Classical` for each of the different genres/channels',
        'Step 2: Chips will take up to 30 minutes to start streaming.',
      ].join('\n'))
        .setFooter(`🔈🎵 ${l} servers tuned in!`)
        .setColor(guild ? member.displayColor : 301423));
    }

    let h;
    if (_handlers.has(guild.id)) {
      h = _handlers.get(guild.id);
    } else {
      h = new Handler(guild.id, client, prefix);
      _handlers.set(guild.id, h);
    }
    if (args[0] === 'demo') {
      if (!member.voiceChannel) return send('Please join a voice channel first');
      return h.startDemo(member.voiceChannel, channel);
    }
    return true;
  },
};
