const { Chess } = require('chess.js');
const ChessConstants = require('../../../deps/Constants').chess;
const {W, B, chessPieces: pieces, startFen} = ChessConstants;
const files = new Array(8).fill(0).map((e,i)=>String.fromCharCode('A'.charCodeAt(0) + i));

const ChessGame = class ChessGame extends require('../BoardGame') {
  constructor(options) {
    super({
      gameName: 'Chess',
      maxPlayers: 2,
      guildOnly: true,
      channelID: options.channelID,
      empty: null,
    });

    this.game = new Chess(options.newFen||startFen);
    this.board = new Array(8).fill(0);

  }

  updateViewFen(fen) {
    if(!this.board) throw new Error('Board not initiated ?!?!?!1!!1!');

    const all = fen.replace(/\d+/g, e => 'A'.repeat(+e)).split(/\s+/)[0].split('/').map(e=>e.split(''));

    for(const c in all){
      for(let i = 0; i < all[c].length; i++)
        if(all[c][i]==='A')
          this.board[c][files[i]] = c%2===i%2 ? W : B;
        else
          this.board[c][files[i]] = pieces.get(`${all[c][i].toLowerCase()}${all[c][i].toLowerCase()===all[c][i]?'b':'w'}${c%2===i%2?'w':'b'}`);
    }
    return this.board;
  }

  toString(colorBottom) {
    const joined = this.board.map(e=>Object.keys(e).map(k=>e[k]).join(''));
    return colorBottom === 'white' ? joined.join('\n'): joined.reverse().join('\n');
  }

  move (place) {
    const tempMove =  this.game.move(place, {sloppy: !0});
    if(tempMove) this.lastMove = tempMove;
    else throw new Error('Move not completed !!!11!1!111!');
    this.handleNextCapture(this.lastMove.captured);
  }

};

exports.ChessGame = ChessGame;
