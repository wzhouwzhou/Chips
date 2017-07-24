
const Handler = require('../../../rewrite-all/src/struct/music/MusicHandler.js').default;

const _handlers = new Map();

module.exports = {
  name: "music",
  async func(msg, { args, guild, client, member, channel, reply }) {
    let h;
    if(_handlers.has(guild.id)) h = _handlers.get(guild.id);
    else{
      h = new Handler(guild.id, client);
      _handlers.set(guild.id, h);
    }
    if(args&&args[0]==='demo'){
      if(!member.voiceChannel) return reply('Please join a voice channel first');
      h.startDemo(member.voiceChannel,channel);
    }
  }
};
