'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const MusicPlayer = require('./MusicPlayer').default;
const { YTSearcher } = require('ytsearcher');

//const Discord = require('discord.js');
const Logger = require('../client/Logger').default;

const searcher = new YTSearcher(process.env.YTKEY);

const GuildMusicHandler = class MusicHandler {
  constructor ( guildid, client ) {
    this.guild = client.guilds.get(guildid);
    this.enabled = false;
  }

  spawnPlayer (vc,tc) {
    this.player = new MusicPlayer(vc,tc);
    return this;
  }

  promptSong ( searchcontent, msg ) {
    if(!this.player) return null;
    searcher.search(searchcontent, { type: 'video' }).then( searchResult => {
      if(!searchResult.first||!searchResult.first.url)
        msg.channel.send('No song found by that name');
      this._queue(searchResult.first.url);
    }).catch(err=>{
      msg.channel.send('Something went wrong with the search...');

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
