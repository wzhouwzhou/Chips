'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const MusicPlayer = require('./MusicPlayer').default;
const { Song } = require('./Song');
const { YTSearcher } = require('ytsearcher');

// Const Discord = require('discord.js');

const Logger = require('../client/Logger').create('Music', 'Handler');

const searcher = new YTSearcher(process.env.YTKEY);

const _handlers = new Map();

const cmds = [
  [
    'To queue a song from youtube:',
    '{}p/play songNameOrURL',
  ], [
    'To skip a song:',
    '{}skip',
  ], [
    'To remove a song from the queue',
    '{}unqueue songurl *or* {}remove songurl',
  ], [
    'To pause the player',
    '{}pause',
  ], [
    'To unpause the player',
    '{}unpause *or* {}resume',
  ], [
    'To toggle looping the player',
    '{}loop',
  ], [
    'To set the volume of the player as a percentage from 0 to 200 (example below uses 30% volume)',
    '{}v/vol/volume 30',
  ], [
    'To see the song currently playing',
    '{}now playing',
  ],
];

let NCSBroadcast, MonstercatBroadcast, LM, WQXRBroadcast, ChillHopBroadcast, TGLBroadcast;

const GuildMusicHandler = class MusicHandler {
  constructor(guildid, client) {
    if (!_handlers.has(guildid)) {
      this.guild = client.guilds.get(guildid);
      this.enabled = true;
      this._client = client;
      _handlers.set(guildid, this);
      this.streamOpts = { passes: 3, volume: 0.5, bitrate: 128 };
      this.broadcastOpts = { passes: 2, volume: 0.6, bitrate: 128 };
    }
  }

  async startWQXRBroadcast() {
    Logger.debug('Starting WQXRBroadcast');
    if (WQXRBroadcast) {
      WQXRBroadcast.removeAllListeners();
      WQXRBroadcast.end();
    }
    if (!this._client.musicBroadcasts) this._client.musicBroadcasts = {};
    if (!WQXRBroadcast) WQXRBroadcast = this._client.createVoiceBroadcast();
    const WQXR = await new Song('https://api.chipsbot.me:2087/music2?id=1', this._client.user);
    this._client.musicBroadcasts.wqxr = WQXRBroadcast;
    WQXRBroadcast.once('end', () => setTimeout(() => this.startWQXRBroadcast(), 4000));
    WQXRBroadcast.on('error', Logger.error.bind(Logger));
    WQXRBroadcast.on('warn', Logger.error.bind(Logger));
    WQXRBroadcast.playStream(WQXR.url, this.broadcastOpts);
    return WQXRBroadcast;
  }

  async startNCSBroadcast() {
    Logger.debug('Starting NCSBroadcast');
    if (NCSBroadcast) {
      NCSBroadcast.removeAllListeners();
      NCSBroadcast.end();
    }
    if (!this._client.musicBroadcasts) this._client.musicBroadcasts = {};
    if (!NCSBroadcast) NCSBroadcast = this._client.createVoiceBroadcast();
    const NCS = await new Song('https://youtube.com/watch?v=4rdaGSlLyDE', this._client.user).loadInfo();
    this._client.musicBroadcasts.ncs = NCSBroadcast;
    NCSBroadcast.once('end', () => setTimeout(() => this.startNCSBroadcast(), 5000));
    NCSBroadcast.on('error', Logger.error.bind(Logger));
    NCSBroadcast.on('warn', Logger.error.bind(Logger));
    NCSBroadcast.playStream(NCS.stream, this.broadcastOpts);
    return NCSBroadcast;
  }

  async startTGLBroadcast() {
    Logger.debug('Starting startTGLBroadcast');
    if (TGLBroadcast) {
      TGLBroadcast.removeAllListeners();
      TGLBroadcast.end();
    }
    if (!this._client.musicBroadcasts) this._client.musicBroadcasts = {};
    if (!TGLBroadcast) TGLBroadcast = this._client.createVoiceBroadcast();
    const TGL = await new Song('https://www.youtube.com/watch?v=ftJYyevC6Us', this._client.user).loadInfo();
    this._client.musicBroadcasts.tgl = TGLBroadcast;
    TGLBroadcast.once('end', () => setTimeout(() => this.startTGLBroadcast(), 5000));
    TGLBroadcast.on('error', Logger.error.bind(Logger));
    TGLBroadcast.on('warn', Logger.error.bind(Logger));
    TGLBroadcast.playStream(TGL.stream, this.broadcastOpts);
    return TGLBroadcast;
  }

  async startLMBroadcast() {
    Logger.debug('Starting LM');
    if (LM) {
      LM.removeAllListeners();
      LM.end();
    }
    if (!this._client.musicBroadcasts) this._client.musicBroadcasts = {};
    if (!LM) LM = this._client.createVoiceBroadcast();
    const LMS = new Song('https://api.chipsbot.me:2087/music2?id=0', this._client.user);
    this._client.musicBroadcasts.lm = LM;
    LM.once('end', () => setTimeout(() => this.startLMBroadcast(), 1000));
    LM.on('error', Logger.error.bind(Logger));
    LM.on('warn', Logger.error.bind(Logger));
    LM.playStream(LMS.url, this.broadcastOpts);
    return LM;
  }

  async startMonstercatBroadcast() {
    Logger.debug('Starting MonstercatBroadcast');
    if (MonstercatBroadcast) {
      MonstercatBroadcast.removeAllListeners();
      MonstercatBroadcast.end();
    }
    if (!this._client.musicBroadcasts) this._client.musicBroadcasts = {};
    if (!MonstercatBroadcast) MonstercatBroadcast = this._client.createVoiceBroadcast();
    const Monstercat = await new Song('https://api.chipsbot.me:2087/music1?id=3', this._client.user);
    this._client.musicBroadcasts.monstercat = MonstercatBroadcast;
    MonstercatBroadcast.once('end', () => setTimeout(() => this.startMonstercatBroadcast(), 2000));
    MonstercatBroadcast.on('error', Logger.error.bind(Logger));
    MonstercatBroadcast.on('warn', Logger.error.bind(Logger));
    MonstercatBroadcast.playStream(Monstercat.url, this.broadcastOpts);
    return MonstercatBroadcast;
  }

  async startChillHopBroadcast() {
    Logger.debug('Starting ChillHopBroadcast');
    if (ChillHopBroadcast) {
      ChillHopBroadcast.removeAllListeners();
      ChillHopBroadcast.end();
    }
    if (!this._client.musicBroadcasts) this._client.musicBroadcasts = {};
    if (!ChillHopBroadcast) ChillHopBroadcast = this._client.createVoiceBroadcast();
    const ChillHop = await new Song('https://www.youtube.com/watch?v=6rReMbO42uE', this._client.user).loadInfo();
    this._client.musicBroadcasts.Chillhop = ChillHopBroadcast;
    ChillHopBroadcast.once('end', this.startChillHopBroadcast.bind(this));
    ChillHopBroadcast.on('error', Logger.error.bind(Logger));
    ChillHopBroadcast.on('warn', Logger.error.bind(Logger));
    ChillHopBroadcast.playStream(ChillHop.stream, this.broadcastOpts);
    return ChillHopBroadcast;
  }

  async playAllNCS() {
    if (!NCSBroadcast) return 'NCS Broadcast not started';
    if (!this._client.ncsChannels) this._client.ncsChannels = {};
    const leaves = [];
    for (const cid of Object.keys(this._client.ncsChannels)) leaves.push(this._client.channels.get(cid).leave());
    await Promise.all(leaves);
    this._client.ncsChannels = {};
    for (const [, vc] of this._client.channels.filter(c => c.type === 'voice')) {
      if (vc.name.replace(/\s+/g, '').match(/chip(?:sy?)?(?:streams?|24\/?7)(ncs|nocopyrightsounds?)/i)) {
        vc.join().then(connection => {
          connection.playBroadcast(NCSBroadcast, this.streamOpts);
          this._client.ncsChannels[connection.channel.id] = { connection, dispatcher: connection.dispatcher };
        });
      }
    }
    return this._client.ncsChannels;
  }

  async playAllTGL() {
    if (!TGLBroadcast) return 'TGL Broadcast not started';
    if (!this._client.tglChannels) this._client.tglChannels = {};
    const leaves = [];
    for (const cid of Object.keys(this._client.tglChannels)) leaves.push(this._client.channels.get(cid).leave());
    await Promise.all(leaves);
    this._client.tglChannels = {};
    for (const [, vc] of this._client.channels.filter(c => c.type === 'voice')) {
      if (vc.name.replace(/\s+/g, '').match(/chip(?:sy?)?(?:streams?|24\/?7)(tgl|thegoodlife?)/i)) {
        vc.join().then(connection => {
          connection.playBroadcast(TGLBroadcast, this.streamOpts);
          this._client.tglChannels[connection.channel.id] = { connection, dispatcher: connection.dispatcher };
        });
      }
    }
    return this._client.tglChannels;
  }

  async playAllMonstercat() {
    if (!MonstercatBroadcast) return 'Monstercat Broadcast not started';
    if (!this._client.monstercatChannels) this._client.monstercatChannels = {};
    const leaves = [];
    for (const cid of Object.keys(this._client.monstercatChannels)) leaves.push(this._client.channels.get(cid).leave());
    await Promise.all(leaves);

    this._client.monstercatChannels = {};
    for (const [, vc] of this._client.channels.filter(c => c.type === 'voice')) {
      if (vc.name.replace(/\s+/g, '').match(/chip(?:sy?)?(?:streams?|24\/?7)(monstercat|monster)/i)) {
        vc.join().then(connection => {
          connection.playBroadcast(MonstercatBroadcast, this.streamOpts);
          this._client.monstercatChannels[connection.channel.id] = { connection, dispatcher: connection.dispatcher };
        });
      }
    }
    return this._client.monstercatChannels;
  }

  async playAllChillHop() {
    if (!ChillHopBroadcast) return 'ChillHop Broadcast not started';
    if (!this._client.chillHopChannels) this._client.chillHopChannels = {};
    const leaves = [];
    for (const cid of Object.keys(this._client.chillHopChannels)) leaves.push(this._client.channels.get(cid).leave());
    await Promise.all(leaves);

    this._client.chillHopChannels = {};
    for (const [, vc] of this._client.channels.filter(c => c.type === 'voice')) {
      if (vc.name.replace(/\s+/g, '').match(/chip(?:sy?)?(?:streams?|24\/?7)(chillhop|lowfi)/i)) {
        vc.join().then(connection => {
          connection.playBroadcast(ChillHopBroadcast, this.streamOpts);
          this._client.chillHopChannels[connection.channel.id] = { connection, dispatcher: connection.dispatcher };
        });
      }
    }
    return this._client.chillHopChannels;
  }

  async playAllLM() {
    if (!LM) return 'LM Broadcast not started';
    if (!this._client.lmChannels) this._client.lmChannels = {};
    const leaves = [];
    for (const cid of Object.keys(this._client.lmChannels)) leaves.push(this._client.channels.get(cid).leave());
    await Promise.all(leaves);

    this._client.lmChannels = {};
    for (const [, vc] of this._client.channels.filter(c => c.type === 'voice')) {
      if (vc.name.replace(/\s+/g, '').match(/chip(?:sy?)?(?:streams?|24\/?7)(listen\.moe)/i)) {
        vc.join().then(connection => {
          connection.playBroadcast(LM, this.streamOpts);
          this._client.lmChannels[connection.channel.id] = { connection, dispatcher: connection.dispatcher };
        });
      }
    }
    return this._client.lmChannels;
  }

  async playAllWQXR() {
    if (!WQXRBroadcast) return 'WQXR Broadcast not started';
    if (!this._client.wqxrChannels) this._client.wqxrChannels = {};
    const leaves = [];
    for (const cid of Object.keys(this._client.wqxrChannels)) leaves.push(this._client.channels.get(cid).leave());
    await Promise.all(leaves);
    this._client.wqxrChannels = {};
    for (const [, vc] of this._client.channels.filter(c => c.type === 'voice')) {
      if (vc.name.replace(/\s+/g, '').match(/chip(?:sy?)?(?:streams?|24\/?7)(wqxr|classical?)/i)) {
        vc.join().then(connection => {
          connection.playBroadcast(WQXRBroadcast, this.streamOpts);
          this._client.wqxrChannels[connection.channel.id] = { connection, dispatcher: connection.dispatcher };
        });
      }
    }
    return this._client.wqxrChannels;
  }

  spawnPlayer(vc, tc) {
    this.player = new MusicPlayer(vc, tc, this.streamOpts);
    return this;
  }

  startDemo(vc, tc) {
    this.spawnPlayer(vc, tc);
    this.constructor.spawnDemoCollector(tc, this);
    return this;
  }

  static spawnDemoCollector(tc, handler, time) {
    if (handler.demoActive) return tc.send('Demo mode was already activated for your server!');

    handler.demoActive = true;
    handler.collector = tc.createMessageCollector(
      () => true,
      { time: (time || 1440) * 60 * 1000 }
    );
    handler.collector.on('collect', async m => {
      let searchQ;
      if (m.content.match(/^<@!?296855425255473154>\s*skip/i)) {
        handler.player.skip();
      } else if (m.content.match(/^<@!?296855425255473154>\s*pause/i)) {
        handler.player.pause();
      } else if (m.content.match(/^<@!?296855425255473154>\s*(unpause|resume)/i)) {
        handler.player.unpause();
      } else if (m.content.match(/^<@!?296855425255473154>\s*loop/i)) {
        handler.player.toggleNextLoop();
      } else if (m.content.match(/^<@!?296855425255473154>\s*p(?:lay)?/i)) {
        searchQ = m.content.replace(/^<@!?296855425255473154>\s*p(?:lay)?\s*/i, '');
        if (!searchQ || searchQ.length === 0) return m.reply('You must provide a song name or url to play!');
        handler.promptSong(searchQ, m.channel.id === tc.id ? m.member : null);
      } else if (m.content.match(/^<@!?296855425255473154>\s*(unqueue|remove)/i)) {
        searchQ = m.content.replace(/^<@!?296855425255473154>\s*(unqueue|remove)\s*/i, '');
        if (!searchQ || searchQ.length === 0) return m.reply('You must provide a url to remove from the queue');
        const ind = handler.player.queue.indexOf(searchQ);
        if (ind > -1) {
          handler.player.queue.splice(ind, 1);
          await tc.send(`Removed \`${searchQ}\` from the queue`);
        } else {
          await tc.send(`Could not find \`${m.content.replace(/@/g, '(at)')}\` in the queue`);
        }
      } else if (m.content.match(/^<@!?296855425255473154>\s*v(?:ol(?:ume)?)?\s*/i)) {
        const vol = m.content.match(/v(?:ol(?:ume)?)?\s*\d+/i)[0].match(/\d+/);
        if (!vol) return m.reply('You must provide a volume to set!');

        handler.player.setVolume(+vol, m.author.id === Constants.users.WILLYZ);
      } else if (m.content.match(/^<@!?296855425255473154>\s*music\s*help/i)) {
        let embed = new Discord.MessageEmbed().setTitle('Chips music help').setColor(12305);
        cmds.map(cmd => cmd.map(text => text.replace(/\{\}/g, handler.prefix || '<@296855425255473154> ')))
          .forEach(cmd => embed.addField(...cmd));
        tc.send('', { embed });
      } else if (m.content.match(/^<@!?296855425255473154>\s*now\s*playing/i)) {
        tc.send(`Currently playing ${handler.player.lastPlayed.name}`);
      } else if (!!~m.content.toLowerCase().indexOf('stopdemo') && (m.author.id === Constants.users.WILLYZ || m.author.id === Constants.users.EDP)) {
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
      .then(()/* Mm*/=> {
      // Handler.promptSong('Wk8dkPj91ak',mm);//handler.promptSong('https://www.youtube.com/watch?v=4rdaGSlLyDE',mm);
      });
    return handler.collector;
  }

  promptSong(searchcontent, msg) {
    const channel = msg.channel;
    if (!this.player) return null;
    searcher.search(searchcontent, { type: 'video' }).then(searchResult => {
      if (!searchResult.first || !searchResult.first.url) channel.send('No song found by that name');
      this._queue(new Song(searchResult.first.url, msg.member));
    }).catch(err => {
      channel.send('Something went wrong with the search...');

      Logger.error(err);
    });
    return this;
  }

  _queue(song) {
    if (!this.player) return null;
    this.player.queueSong(song);
    return this.player;
  }

  setDJRole(djRID) {
    this.DJR = this.guild.roles.get(djRID);
  }

  loopPlayer() {
    if (!this.player) return null;
    this.player.toggleNextLoop(true);
    return this.player;
  }

  stopPlayer() {
    if (!this.player) return null;
    this.player.shutDown();
    this.player = null;
    return true;
  }
};

exports.default = GuildMusicHandler;
exports.handlers = _handlers;
