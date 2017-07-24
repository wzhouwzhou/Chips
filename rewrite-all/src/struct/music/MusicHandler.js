'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const MusicPlayer = require('./MusicPlayer').default;
const { YTSearcher } = require('ytsearcher');

//const Discord = require('discord.js');
const Logger = require('../client/Logger').default;

const searcher = new YTSearcher(process.env.YTKEY);

const _handlers = new Map();

const cmds = [
  [
    'To queue a song from youtube:',
    '<@296855425255473154> play songNameOrURL'
  ],[
    'To skip a song:',
    '<@296855425255473154> skip'
  ],[
    'To remove a song from the queue',
    '<@296855425255473154> unqueue songurl *or* <@296855425255473154> remove songurl'
  ],[
    'To pause the player',
    '<@296855425255473154> pause'
  ],[
    'To unpause the player',
    '<@296855425255473154> unpause *or* <@296855425255473154> resume'
  ],[
    'To toggle looping the player',
    '<@296855425255473154> loop'
  ]
];

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

  static spawnDemoCollector (tc, handler, time) {
    handler.collector = tc.createCollector(
      () => true,
      { time: (time||60)*60*1000 }
    );
    handler.collector.on('collect', async m => {
      let searchQ;
      if(!!m.content.match(/^<@!?296855425255473154>\s*play/i)){
        searchQ = m.content.replace(/^<@!?296855425255473154>\s*play/i,'');
        handler.promptSong(searchQ, tc);
      }else if(!!m.content.match(/^<@!?296855425255473154>\s*skip/i)){
        handler.player.skip();
      }else if(!!m.content.match(/^<@!?296855425255473154>\s*pause/i)){
        handler.player.pause();
      }else if(!!m.content.match(/^<@!?296855425255473154>\s*(unpause|resume)/i)){
        handler.player.unpause();
      }else if(!!m.content.match(/^<@!?296855425255473154>\s*loop/i)){
        handler.player.toggleNextLoop();
      }else if(!!m.content.match(/^<@!?296855425255473154>\s*(unqueue|remove)/i)){
        searchQ = m.content.replace(/^<@!?296855425255473154>\s*play/i,'');

        const ind = handler.player.queue.indexOf(searchQ);
        if(ind) {
          handler.player.queue.splice(ind,1);
          await tc.send(`Removed \`${searchQ}\` from the queue`);
        }else
          await tc.send(`Could not find \`${url}\` in the queue`);

      }else if(!!m.content.match(/^<@!?296855425255473154>\s*music\s*help/i)){
        let musichelp=[];
        cmds.forEach(cmd=>{
          musichelp.push(`**${cmd[0]}**\n${cmd[1]}`);
        });
        tc.send(musichelp.join('\n'));
      }else if((!!~m.content.toLowerCase().indexOf('stopdemo'))&&m.author.id===Constants.users.WILLYZ){
        handler.collector.stop();
        tc.send('Stopping...');
      }
    });
    handler.collector.on('end', () => {
      handler.stopPlayer();
      tc.send('Demo trial has ended!');
    })

    tc.send(`Enabling demo mode and starting a 24/7 yt stream.`).then(mm=>{
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
