'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const MusicPlayer = require('./MusicPlayer').default;
const { Song } = require('./Song');
const { YTSearcher } = require('ytsearcher');

//const Discord = require('discord.js');

const Logger = require('../client/Logger').create('Music','Handler');

const searcher = new YTSearcher(process.env.YTKEY);

const _handlers = new Map();

const cmds = [
  [
    'To queue a song from youtube:',
    '{}p/play songNameOrURL'
  ],[
    'To skip a song:',
    '{}skip'
  ],[
    'To remove a song from the queue',
    '{}unqueue songurl *or* {}remove songurl'
  ],[
    'To pause the player',
    '{}pause'
  ],[
    'To unpause the player',
    '{}unpause *or* {}resume'
  ],[
    'To toggle looping the player',
    '{}loop'
  ],[
    'To set the volume of the player as a percentage from 0 to 200 (example below uses 30% volume)',
    '{}v/vol/volume 30'
  ],[
    'To see the song currently playing',
    '{}now playing'
  ]
];

let NCSBroadcast, MonstercatBroadcast;

const GuildMusicHandler = class MusicHandler {
  constructor ( guildid, client ) {
    if(!_handlers.has(guildid)){
      this.guild = client.guilds.get(guildid);
      this.enabled = true;
      this._client = client;
      _handlers.set(guildid,this);
    }
  }

  async startNCSBroadcast () {
    if(NCSBroadcast) return 'Broadcast already started';
    if(!this._client.musicBroadcasts) this._client.musicBroadcasts = {};
    NCSBroadcast = this._client.createVoiceBroadcast();
    const NCS = await (new Song('https://www.youtube.com/watch?v=lFvQifetTAs', client.user).loadInfo());
    this._client.musicBroadcasts['ncs'] = NCSBroadcast;
    NCSBroadcast.playStream(NCS.stream, { passes: 2, volume: 0.5, bitrate: 96000 });
    return NCSBroadcast;
  }

  async startMonstercatBroadcast () {
    if(MonstercatBroadcast) return 'Broadcast already started';
    if(!this._client.musicBroadcasts) this._client.musicBroadcasts = {};
    MonstercatBroadcast = this._client.createVoiceBroadcast();
    const Monstercat = await (new Song('https://www.youtube.com/watch?v=ueupsBPNkSc', client.user).loadInfo());
    this._client.musicBroadcasts['ncs'] = NCSBroadcast;
    MonstercatBroadcast.playStream(Monstercat.stream, { passes: 2, volume: 0.5, bitrate: 96000 });
    return MonstercatBroadcast;
  }

  async playAllNCS () {
    if(!NCSBroadcast) return 'Broadcast not started';
    if(!this._client.ncsChannels) this._client.ncsChannels = {};
    for(const [,vc] of this._client.channels.filter(c=>c.type==='voice'))
      if(~vc.name.indexOf('Chips Stream NCS')) {
        await vc.leave();
        const connection = await vc.join();
        const dispatcher = connection.playBroadcast(NCSBroadcast);
        this._client.ncsChannels[vc.id] = { connection, dispatcher };
      }
    return this._client.ncsChannels;
  }

  async playAllMonstercat () {
    if(!MonstercatBroadcast) return 'Broadcast not started';
    if(!this._client.monstercatChannels) this._client.monstercatChannels = {};
    for(const [,vc] of this._client.channels.filter(c=>c.type==='voice'))
      if(~vc.name.indexOf('Chips Stream Monstercat')) {
        await vc.leave();
        const connection = await vc.join();
        const dispatcher = connection.playBroadcast(MonstercatBroadcast);
        this._client.monstercatChannels[vc.id] = { connection, dispatcher };
      }
    return this._client.monstercatChannels;
  }


  spawnPlayer (vc,tc) {
    this.player = new MusicPlayer(vc,tc);
    return this;
  }

  startDemo (vc,tc) {
    this.spawnPlayer (vc,tc);
    this.constructor.spawnDemoCollector (tc, this);
    return this;
  }

  static spawnDemoCollector (tc, handler, time) {
    if(handler.demoActive) return tc.send('Demo mode was already activated for your server!');

    handler.demoActive = true;
    handler.collector = tc.createMessageCollector(
      () => true,
      { time: (time||1440)*60*1000 }
    );
    handler.collector.on('collect', async m => {
      let searchQ;
      if(m.content.match(/^<@!?296855425255473154>\s*skip/i)){
        handler.player.skip();
      }else if(m.content.match(/^<@!?296855425255473154>\s*pause/i)){
        handler.player.pause();
      }else if(m.content.match(/^<@!?296855425255473154>\s*(unpause|resume)/i)){
        handler.player.unpause();
      }else if(m.content.match(/^<@!?296855425255473154>\s*loop/i)){
        handler.player.toggleNextLoop();
      }else if(m.content.match(/^<@!?296855425255473154>\s*p(?:lay)?/i)){
        searchQ = m.content.replace(/^<@!?296855425255473154>\s*p(?:lay)?\s*/i,'');
        if(!searchQ||searchQ.length===0) return m.reply('You must provide a song name or url to play!');
        handler.promptSong(searchQ, m.channel.id===tc.id?m.member:null);
      }else if(m.content.match(/^<@!?296855425255473154>\s*(unqueue|remove)/i)){
        searchQ = m.content.replace(/^<@!?296855425255473154>\s*(unqueue|remove)\s*/i,'');
        if(!searchQ||searchQ.length===0) return m.reply('You must provide a url to remove from the queue');
        const ind = handler.player.queue.indexOf(searchQ);
        if(ind>-1) {
          handler.player.queue.splice(ind,1);
          await tc.send(`Removed \`${searchQ}\` from the queue`);
        }else
          await tc.send(`Could not find \`${url}\` in the queue`);

      }else if(m.content.match(/^<@!?296855425255473154>\s*v(?:ol(?:ume)?)?\s*/i)){
        const vol = m.content.match(/v(?:ol(?:ume)?)?\s*\d+/i)[0].match(/\d+/);
        if(!vol) return m.reply('You must provide a volume to set!');

        handler.player.setVolume(+vol,m.author.id===Constants.users.WILLYZ);
      }else if(m.content.match(/^<@!?296855425255473154>\s*music\s*help/i)){
        let embed =new Discord.MessageEmbed().setTitle('Chips music help').setColor(12305);
        cmds.map(cmd => cmd.map(text=>text=text.replace(/\{\}/g,handler.prefix||'<@296855425255473154> '))).forEach(cmd=>embed.addField(...cmd));
        tc.send('', { embed });
      }else if(m.content.match(/^<@!?296855425255473154>\s*now\s*playing/i)){
        tc.send(`Currently playing ${handler.player.lastPlayed.name}`);
      }else if((!!~m.content.toLowerCase().indexOf('stopdemo'))&&(m.author.id===Constants.users.WILLYZ||m.author.id===Constants.users.EDP)){
        handler.collector.stop();
        tc.send('Stopping...');
      }

      return true;
    });
    handler.collector.on('end', () => {
      handler.stopPlayer();
      handler.demoActive = false;
      tc.send('Demo trial has ended!');
    });

    tc.send(`Enabling demo mode for this server!
**Type __<@296855425255473154> music help__ to view music cmds!**`)
    .then(mm=>{
      //handler.promptSong('Wk8dkPj91ak',mm);//handler.promptSong('https://www.youtube.com/watch?v=4rdaGSlLyDE',mm);
    });
  }

  promptSong ( searchcontent, msg ) {
    const channel = msg.channel;
    if(!this.player) return null;
    searcher.search(searchcontent, { type: 'video' }).then( searchResult => {
      if(!searchResult.first||!searchResult.first.url)
        channel.send('No song found by that name');
      this._queue(new Song(searchResult.first.url, msg.member));
    }).catch(err=>{
      channel.send('Something went wrong with the search...');

      Logger.error(err);
    });
    return this;
  }

  _queue ( song ) {
    if(!this.player) return null;
    this.player.queueSong(song);
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
exports.handlers = _handlers;
