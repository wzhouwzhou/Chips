const BoardGame = require('../BoardGame');

const SHIP = '⚫', WATER = '🔵', HIT = '🔴', MISS = '⚪';

const BattleshipGame = class BattleshipGame extends BoardGame {
  constructor({
    channelID
  }) {
    super({
      gameName: 'Battleship',
      maxPlayers: 2,
      guildOnly: true,
      channelID,
      empty: WATER,
    });


  }
}
