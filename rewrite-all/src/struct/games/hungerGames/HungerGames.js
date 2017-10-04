'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Game = require('./Game').GameClass;

const HungerGames = class HungerGames extends Game {
  constructor({
    channelID,
    tributes = new Map(),
  }) {
    super({
      gameName: 'Hunger Games',
      maxPlayers: 28,
      guildOnly: true,
      channelID,
    });
    this.districts = new Array(14).fill(0).map((e,i) => new District(i, tributes));
  }

  addTribute (newTribute) {
    this.districts.forEach(e=>e.addTribute(newTribute))
  }
};

exports.BoardGame = BoardGame;
