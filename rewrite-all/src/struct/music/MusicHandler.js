'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const MusicPlayer = require('./MusicPlayer');
const YTSearcher = require('ytsearcher');
const searcher = new YTSearcher(process.env.YTKEY);

const GuildMusicHandler = class MusicHandler {
  constructor ( guild ) {
    this.guildid = guild.id;
    this.player = new MusicPlayer( vc );
  }

  queue ( url ) {
    this.player.queue(url);
  }
};

exports = GuildMusicHandler;

//`async let message= msg; const voiceChannel = message.member.voiceChannel; const ytdl = require('ytdl-core'); if (!voiceChannel) return message.reply(`Please be in a voice channel first!`); voiceChannel.join() .then(connnection => { const stream = ytdl("https://www.youtube.com/watch?v=uHeWc4cd0dc", { filter: 'audioonly' }); const dispatcher = connnection.playStream(stream); dispatcher.on('end', () => voiceChannel.leave()); });
