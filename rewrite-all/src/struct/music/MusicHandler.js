'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const MusicPlayer = require('./MusicPlayer').default;
const { YTSearcher } = require('ytsearcher');

//const Discord = require('discord.js');
const Logger = require('../client/Logger').default;

const searcher = new YTSearcher(process.env.YTKEY);

const _handlers = new Map();

const GuildMusicHandler = class MusicHandler {
  constructor ( guildid, client ) {
    this.guild = client.guilds.get(guildid);
    this.enabled = true;
    this._client = client;
    _handlers.set(guildid,this);

  }

  spawnPlayer (vc,tc) {
    this.player = new MusicPlayer(vc,tc);
    return this;
  }

  startDemo (vc,tc) {
    this.spawnPlayer (vc,tc);
    this.constructor.spawnDemoCollector (tc, this);
  }

  static spawnDemoCollector (tc, handler) {
    handler.collector = tc.createCollector(
      () => true,
      { time: 60*60*1000 }
    );
    handler.collector.on('collect', m => {
      let searchQ;
      if(!!m.content.match(/^<@!?296855425255473154>\s*play/i)){
        searchQ = m.content.replace(/^<@!?296855425255473154>\s*play/i,'');
        handler.promptSong(searchQ, tc);
      }else if(!!m.content.match(/^<@!?296855425255473154>\s*skip/i)){
        handler.player.skip();
      }else if(!!~m.content.toLowerCase().indexOf('stopdemo')&&m.author.id==Constants.users.WILLYZ){
        handler.collector.stop();
      }
    });
    handler.collector.on('end', () => {
      handler.stopPlayer();
      tc.send('Demo trial has ended!');
    })

    tc.send(`Enabling demo mode and starting a 24/7 stream.
To queue a song from youtube simply type:\n\t<@!296855425255473154> play songNameOrURL\n
To skip a song simply type:\n\t<@!296855425255473154> skip`).then(mm=>{
      handler.promptSong('https://www.youtube.com/watch?v=4rdaGSlLyDE',tc);
    });
  }

  promptSong ( searchcontent, channel ) {
    if(!this.player) return null;
    searcher.search(searchcontent, { type: 'video' }).then( searchResult => {
      if(!searchResult.first||!searchResult.first.url)
        channel.send('No song found by that name');
      this._queue(searchResult.first.url);
    }).catch(err=>{
      channel.send('Something went wrong with the search...');

      Logger.log({
        type: 'error',
        msgmodule: 'Music',
        logcategory: 'Handler',
        msg: err,
      });
    });
    return this;
  }

  _queue ( url ) {
    if(!this.player) return null;
    this.player.queueUrl(url);
    return this.player;
  }

  setDJRole (djRID) {
    this.DJR = this.guild.roles.get(djRID);
  }

  loopPlayer () {
    if(!this.player) return null;
    this.player.toggleNextLoop(true);
    return this.player;
  }

  stopPlayer () {
    if(!this.player) return null;
    this.player.shutDown();
    this.player = null;
  }
};

exports.default = GuildMusicHandler;
