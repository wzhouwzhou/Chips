
const Handler = require('../../../rewrite-all/src/struct/music/MusicHandler.js').default;

const _handlers = new Map();

module.exports = {
  _handlers,
  name: "music",
  async func(msg, { args, guild, client, member, channel, reply, send, prefix }) {
    if(!args[0]||args[0]==='help'){
      return send(new Discord.MessageEmbed().setTitle('Available actions').setDescription([
        `**${_.escapeRegExp(prefix)}${this.name} demo** to start the music module, more instructions will follow.`,
        `**${_.escapeRegExp(prefix)}${this.name} radio** to see details about chips radio`,
      ].join('\n')));
    }
    if(args[0]==='radio'){
      return send(new Discord.MessageEmbed().setTitle('Chips radio (Beta™)').setDescription([
        '**Introducing Chips 24/7 radio!**\n',
        'Step 1: Have a voice channel with **`Chips Stream NCS`** or **`Chips Stream Monstercat`** in the name',
        'Step 2: Chips will check every 30 minutes and join that voice channel and stream 24/7 ncs or monstercat music',
      ].join('\n')));
    }

    let h;
    if(_handlers.has(guild.id)) h = _handlers.get(guild.id);
    else{
      h = new Handler(guild.id, client, prefix);
      _handlers.set(guild.id, h);
    }
    if(args[0]==='demo'){
      if(!member.voiceChannel) return reply('Please join a voice channel first');
      h.startDemo(member.voiceChannel,channel);
    }
  }
};
