'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Discord = require('discord.js');

const GameClass = class Game {
  constructor ({
    gameName,
    maxPlayers,
    guildOnly,
    channelID,
  }) {
    this.name = gameName;
    this.maxPlayers = maxPlayers;
    this.guildOnly = guildOnly;
    this.channelID = channelID;
    this.players = new Discord.Collection();
    this.joinAfterStart = joinAfterStart;
  }

  join ( msg ) {
    return new Promise ( (res, rej) => {
      if( this.channelID == msg.channel.id )
        if( !this.started || ( this.started && this.joinAfterStart )) {
          res( this.players.set( msg.author.id, msg.author ));
        }
      rej(msg);
    });
  }

  leave ( msg ) {
    return new Promise (( res, rej ) => {
      if( this.channelID == msg.channel.id ) {
        this.players.delete( msg.author.id );
        res(clearPlayerData ( msg.author.id ));
      }
      rej(msg);
    });
  }

  getPlayerCount () {
    return this.playerCount || 0;
  }

  reloadAllPlayerData  () { }
  clearPlayerData () { }
  setPlayerData   () { }
  getPlayerData () { }
};

exports = GameClass;
