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

  joinVC () {
    return new Promise ( async (res, rej) => {
      if(!this.voiceChannel) rej(null);

      this.connection = await this.voiceChannel.join();
      res(this.connection);
    });
  }

  playNextQueue (){
    if (!this.textchannel) return Logger.log('Error','Music','Player','Text Channel is undefined!');

    if (!this.voiceChannel) return this.textchannel.send('I am not bound to a voice channel!');
    if (!this.queue||this.queue.length == 0) return this.textchannel.send('There is nothing left in the song queue!');
    if(this.connection) leaveVC();

    joinVC().then(connection=>{
      this.connection = connection;
      const song = this.looping?this.lastPlayed:queue.shift();

      this.textchannel.send(`Now playing ${song}.`);
      const stream = ytdl( song );

      const dispatcher = this.connnection.playStream(stream);

      dispatcher.once('end', () => {
        if(this.queue.length == 0){
          this.leaveVC();
          this.connection = null;

          this.textchannel.send('Ended! ' + (new Date).toUTCString());
        }
        else
          this.playNextQueue(); //recurse
      });
    });
  }

  leaveVC () {
    return this.voicechannel?this.voicechannel.leave():null;
  }

  queue (url) {
    this.queue.push(url);
    if(this.queue.length == 1) this.playNextQueue();
  }

  sample () {
    this.queue('https://www.youtube.com/watch?v=h--P8HzYZ74');
  }
};

exports = Player;
