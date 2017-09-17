'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Chess } = require('chess.js');
const Discord = require('discord.js');

const Constants = require('../../../deps/Constants');
const ChessConstants = Constants.chess;
const {W, B, chessPieces: pieces, startFen, label2} = ChessConstants;
const files = new Array(8).fill(0).map((e,i)=>String.fromCharCode('A'.charCodeAt(0) + i));

const ChessGame = class ChessGame extends require('../BoardGame').BoardGame {
  constructor(options) {
    super({
      gameName: 'Chess',
      maxPlayers: 2,
      guildOnly: true,
      channelID: options.channel?options.channel.id:0,
      empty: null,
    });
    this.channel = options.channel;
    this.game = new Chess(options.newFen||startFen);
    this.board = new Array(8).fill(0);
    this.embed = new Discord[/^[^]*12\.\d+[^]*$/.test(Discord.version)?'MessageEmbed':'RichEmbed'];
    this.fen = options.newFen||startFen;
    this.boardFen = this.fen.split(/\s+/)[0];
  }

  embedify () {
    if(!this.embed) throw new Error('Embed is missing !!11!1!!!!');
    this.embed = new (this.embed.constructor);
    this.embed.setDescription(this.toString());
    this.embed.setTitle('Chess');
    return this.embed;
  }

  updateFrontEnd () {
    if(!this.channel) throw new Error('Channel is missing !!!11!');
    const embed = this.embedify();
    this.channel.send(embed).then(m=>m.delete(3900));
  }

  randomMove () {
    const possibleMoves = this.game.moves();

    if (this.game.game_over() || this.game.in_draw() || possibleMoves.length === 0) return null;

    const randomIndex = ~~(possibleMoves.length*Math.random());
    this.lastMove = this.game.move(possibleMoves[randomIndex]);
    this.updateViewFen(this.game.fen().split(/\s+/)[0]);
    this.updateFrontEnd();
    return this;
  }

  demoIntervalStart () {
    this.demoInterval = setInterval(() => {
      if(this.randomMove() === null) {
        clearInterval(this.demoInterval);
        this.demoInterval = null;
      }
    }, 4000);
  }


  updateViewFen(fen = this.game.fen().split(/\s+/)[0]) {
    if(!this.board) throw new Error('Board not initiated ?!?!?!1!!1!');

    const all = fen.replace(/\d+/g, e => 'A'.repeat(+e)).split(/\s+/)[0].split('/').map(e=>e.split(''));

    for(const c in all) {
      if(!this.board[c]) this.board[c] = {};

      for(let i = 0; i < all[c].length; i++)
        this.board[c][files[i]] = all[c][i]==='A'
        ?   c%2===i%2 ? W : B
        :   pieces.get(`${all[c][i].toLowerCase()}${all[c][i].toLowerCase()===all[c][i]?'b':'w'}${c%2===i%2?'w':'b'}`);
    }
    return this.board;
  }

  toString(colorBottom='white'/*this.game.turn()*/) {
    let str;
    if((/w(?:hite)?/).test(colorBottom)) this.board.reverse();
    str = this.board.map((e,i)=>[Constants.numbersA[i+1]].concat(Object.keys(e).map(k=>e[k])).join('')).reverse().concat(label2.join('')).join('\n');
    if((/b(?:lack)?/).test(colorBottom)) this.board.reverse();
    return str;
  }

  move (place) {
    const tempMove =  this.game.move(place, {sloppy: !0});
    if(tempMove) this.lastMove = tempMove;
    else throw new Error('Move not completed !!!11!1!111!');
    this.handleNextCapture(this.lastMove.captured);
  }

};

exports.ChessGame = ChessGame;
