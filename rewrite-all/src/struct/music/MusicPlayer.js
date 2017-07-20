'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('../client/Logger').default;

const ytdl = require('ytdl-core');

const MusicPlayer = class MusicPlayer {
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
      if(!this.voicechannel) rej(null);

      this.connection = await this.voicechannel.join();
      res(this.connection);
    });
  }

  playNextQueue (){
    if (!this.textchannel) return Logger.log('Error','Music','Player','Text Channel is undefined!');

    if (!this.voicechannel) return this.textchannel.send('I am not bound to a voice channel!');
    if (!this.queue||this.queue.length == 0) return this.textchannel.send('There is nothing left in the song queue!');
    if(this.connection) this.leaveVC();

    this.joinVC().then(connection=>{
      this.connection = connection;
      const song = this.looping?this.lastPlayed:this.queue.shift();

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

  queueUrl (url) {
    this.queue.push(url);
    if(this.queue.length == 1) this.playNextQueue();
  }

  sample () {
    this.queueUrl('https://www.youtube.com/watch?v=h--P8HzYZ74');
  }
};

exports.default = MusicPlayer;
