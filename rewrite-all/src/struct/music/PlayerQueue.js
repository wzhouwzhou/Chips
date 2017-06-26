
const Queue = class MusicPlayer {
  constructor (vc) {
    this.voicechannel = vc;
  }
  playNextQueue (){
    if (!this.voiceChannel) return message.reply(`Please be in a voice channel first!`);
    voiceChannel.join().then(connnection => {
      const stream = ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ", { filter: 'audioonly' });
      const dispatcher = connnection.playStream(stream);

      dispatcher.on('end', () => voiceChannel.leave());
    });
  }
};

module.exports = Queue;
