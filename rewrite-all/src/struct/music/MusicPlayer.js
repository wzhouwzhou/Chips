'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('../client/Logger').create('Music','Player');
const _ = require('lodash');
const snekfetch = require('snekfetch');

const MusicPlayer = class MusicPlayer {
  constructor (vc, tc, Discord=require('discord.js')) {
    this.voicechannel = vc;
    this.textchannel = tc;
    this.queue = new Array();
    this.looping = false;
    this.Discord = Discord;
  }

  setVC ( newVC ) {
    this.voicechannel = newVC;
  }

  setTC ( newTC ) {
    this.textchannel = newTC;
  }

  joinVC () {
    return new Promise ( async (res, rej) => {
      if(!this.voicechannel||this.shuttingDown) rej(null);

      this.connection = await this.voicechannel.join();
      res(this.connection);
    });
  }

  playNextQueue (){
    if(this.shuttingDown)
      return Logger.error({
        msg: 'Player is shutting down!',
      });
    if (!this.textchannel)
      return Logger.error({
        msg: 'Text Channel is undefined!',
      });

    if (!this.voicechannel) return this.textchannel.send('I am not bound to a voice channel!');
    if (!this.queue||(this.queue.length == 0&&!this.looping)) return this.textchannel.send('There is nothing left in the song queue!');

    this.joinVC().then( () => {
      const song = this.looping?this.lastPlayed:this.queue.shift();
      let embed = new this.Discord.RichEmbed().setTitle('Now playing...').setColor(1);
      embed.setDescription(song.title).setFooter('Length: '+song.length);
      embed.setImage(song.image);
      this.textchannel.send('', { embed });
      Logger.debug({ msg: `Now playing \`${song.title}\`.` });
      this.lastPlayed = song;

      const stream = song.stream;
      this.dispatcher = null;
      this.dispatcher = this.connection.playStream(stream);
      this.dispatcher.setVolume(0.5);

      this.playing = true;
      this.dispatcher.on('debug', msg => {
        return Logger.debug({ msg });
      });
      this.dispatcher.on('end', () => {
        setTimeout(()=>{
          this.playing = false;
          if(this.queue.length == 0&&!this.looping&&!this.shuttingDown){
            this.leaveVC();
            this.connection = null;
            this.dispatcher = null;
            embed = new this.Discord.RichEmbed().setTitle('Queue ended!').setDescription('Queue another song!').setTimestamp(new Date().setColor(8060672));
            this.textchannel.send('', { embed });
          }
          else if(!this.shuttingDown)
            return this.playNextQueue(); //recurse
        }, 750);
      });
    });
  }

  leaveVC () {
    return this.voicechannel?this.voicechannel.leave():null;
  }

  shuffleQueue () {
    this.queue = _.shuffle(this.queue);
    return this.queue;
  }

  queueSong (song) {
    if(this.shuttingDown) return null;
    return song.loadInfo().then(()=>{
      this.queue.push(song);
      const embed = new this.Discord.RichEmbed().setTitle(`Successfully queued ${song.title}`).setColor(2386431);
      embed.setDescription(`There ${this.queue.length==1?'is':'are'} now ${this.queue.length} song${this.queue.length==1?'':'s'} in the queue.`);

      if(this.textchannel) this.textchannel.send('', { embed });
      if(!this.playing) return this.playNextQueue();
    }).catch(err=>Logger.error({msg: err}));
  }

  sample (self) {
    this.queueSong(new Song('https://www.youtube.com/watch?v=h--P8HzYZ74',self));
  }

  toggleNextLoop (override) {
    if(!override || typeof override !== 'boolean')
      this.looping = !this.looping;
    else
      this.looping = override;
    if(this.textchannel) this.textchannel.send(`Successfully toggled looping of \`${this.lastPlayed}\` to ${this.looping}`);
  }

  setVolume ( v, override ) {
    if(this.shuttingDown) return null;
    if(v<0)v=0;
    if(v>200&&!override)v=200;
    if(this.dispatcher){
      this.dispatcher.setVolume(~~v/100);
      if(this.textchannel) this.textchannel.send(`Successfully set volume to ${v}%`);
    }
  }

  shutDown () {
    this.shuttingDown = true;
    this.dispatcher.setVolume(0);

    this.queue = [];
    this.looping = false;
    this.dispatcher.end('Force shutdown');
    this.leaveVC();
    this.voicechannel = null;
    if(this.textchannel) this.textchannel.send('Forcing shutdown...').then(()=>this.textchannel=null);
    this.dispatcher = null;
    this.playing = false;
  }

  skip () {
    if(this.shuttingDown) return;
    if(this.textchannel) this.textchannel.send('Skipping song...');
    this.playing = false;

    this.dispatcher&&this.dispatcher.pause();
    this.leaveVC();
    this.connection = null;
  }

  pause() {
    if(this.shuttingDown) return;
    if(this.textchannel) this.textchannel.send('Pausing song...');
    this.dispatcher&&this.dispatcher.pause();
    return this;
  }

  unpause() {
    if(this.shuttingDown) return;
    if(this.textchannel) this.textchannel.send('Resuming song...');
    this.dispatcher.resume();
    return this;
  }
};

exports.default = MusicPlayer;
