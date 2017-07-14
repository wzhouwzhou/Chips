'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('../client/Logger').default;

const ytdl = require('ytdl-core');

const Player = class MusicPlayer {
  constructor (vc, tc) {
    this.voicechannel = vc;
    this.textchannel = tc;
    this.queue = new Array();
  }

  setVC ( newVC ) {
    this.voicechannel = newVC;
  }

  setTC ( newTC ) {
    this.textchannel = newTC;
  }

  playNextQueue (){
    if (!this.textchannel) return Logger.log('Error','Music','Player','Text Channel is undefined!');

    if (!this.voiceChannel) return this.textchannel.send('I am not bound to a voice channel!');
    if (!this.queue||this.queue.length == 0) return this.textchannel.send('There is nothing in the song queue!');

    voiceChannel.join().then(connnection => {
      const stream = ytdl( queue.shift() );
      const dispatcher = connnection.playStream(stream);

      dispatcher.on('end', () => {

        if(this.queue.length == 0)
          this.leaveVC();
        else
          this.playNextQueue();

      });
    });
  }

  leaveVC () {
    return this.voicechannel?this.voicechannel.leave():null;
  }
};

exports = Player;
