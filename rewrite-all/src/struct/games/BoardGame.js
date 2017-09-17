const Game = require('./Game');
const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();

const BoardGame = class BoardGame extends Game {
  constructor({
    gameName,
    maxPlayers,
    guildOnly,
    channelID,
    empty,
  }) {
    super({
      gameName,
      maxPlayers,
      guildOnly,
      channelID,
    });
    ensureAbstract(this, BoardGame)
    this.empty = empty;

  }

  setCell (row, column, element) {
    let rev = this.board.reverse();
    rev[row-1][column-1] = convertColor(element);
  }

  createBoard (length, width) {
    this.board = new Array(r);
    this.currentBoard = this.board;
    for(const i in board)
      board[i]=new Array(c).fill('🔵');

    this._lengths = new Array(c+1).fill(0);
    this._lengths[0] = r+1;
    return board;
  }
}
/*
const ensureAbstract = (qInstance, qClass) => {
  if(qInstance.constructor === qClass)
    throw new Error('Abstract class BoardGame may not be instantiated');
}
*/
