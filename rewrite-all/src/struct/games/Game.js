'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Discord = require('discord.js');
const EventEmitter = require('events');

const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const GameClass = /* Abstract */ class Game extends EventEmitter {
  constructor({
    gameName,
    maxPlayers,
    guildOnly,
    channelID,
  }) {
    super();
    ensureAbstract(this, GameClass);
    this.name = gameName;
    this.maxPlayers = maxPlayers;
    this.guildOnly = guildOnly;
    this.channelID = channelID;
    this.players = new Discord.Collection();
    // This.joinAfterStart = joinAfterStart;
  }

  join(msg) {
    return new Promise((res, rej) => {
      if (this.channelID === msg.channel.id && this.playerCount > this.maxPlayers) {
        if (!this.started || (this.started && this.joinAfterStart)) {
          res(this.players.set(msg.author.id, msg.author));
        }
      }
      rej(msg);
    });
  }

  leave(msg) {
    return new Promise((res, rej) => {
      if (this.channelID == msg.channel.id) {
        this.players.delete(msg.author.id);
        res(clearPlayerData(msg.author.id));
      }
      rej(msg);
    });
  }

  get playerCount() {
    return this.playerCount || 0;
  }

  reloadAllPlayerData() { }
  clearPlayerData() { }
  setPlayerData() { }
  getPlayerData() { }
};

exports.GameClass = GameClass;
