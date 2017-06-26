'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const ytdl = require('ytdl-core');

const Player = class MusicHandler {
  constructor ( client ) {
    this.guildid = guild.id;
  }

  queue ( url, channel ) {
    this.player.queue(url)
  }
};

exports = Player;

//`async let message= msg; const voiceChannel = message.member.voiceChannel; const ytdl = require('ytdl-core'); if (!voiceChannel) return message.reply(`Please be in a voice channel first!`); voiceChannel.join() .then(connnection => { const stream = ytdl("https://www.youtube.com/watch?v=uHeWc4cd0dc", { filter: 'audioonly' }); const dispatcher = connnection.playStream(stream); dispatcher.on('end', () => voiceChannel.leave()); });
