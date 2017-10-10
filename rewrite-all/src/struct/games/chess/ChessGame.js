'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Chess } = require('chess.js');
const Discord = require('discord.js');

const lastF = require('../../../deps/functions/lastF').default();
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
    this.players = options.players || [];
    this.players = [...this.players, ...[null,null]];
    this.movers = new Map;
    this.movers.set('white',players[0]);
    this.movers.set('black',players[1]);
    this.turn = 'white';

    this.channel = options.channel;
    this.game = new Chess(options.newFen||startFen);
    this.board = new Array(8).fill(0);
    this.embed = new Discord[/^[^]*12\.\d+[^]*$/.test(Discord.version)?'MessageEmbed':'RichEmbed'];
    this.fen = options.newFen||startFen;
    this.boardFen = this.fen.split(/\s+/)[0];
  }

  embedify (end = false) {
    if(!this.embed) throw new Error('Embed is missing !!11!1!!!!');
    this.embed = new (this.embed.constructor);
    this.embed.addField(`${this.movers.get('white').tag}${W} vs ${B}${this.movers.get('black').tag}`, end?this.game.in_draw()?'The game was a draw!':this.turn&&this.turn.toLowerCase()==='black'?'White won!':'Black won!':`${this.turn||'White'} to move`, true);

    this.embed.addField('Last move', this.game.history()&&this.game.history()[0]?this.game.history().reverse()[0]:'None', true);
    this.embed.setTitle('Chess');
    return this.embed;
  }

  updateFrontEnd (end) {
    if(!this.channel) throw new Error('Channel is missing !!!11!');
    const embed = this.embedify(end);
    if(this.lastM) {
      this.lastM.delete();
      this.lastM = null;
    }

    this.channel.send(this.toString(), {embed}).then(m=>this.lastM = m);
  }

  randomMove () {
    const possibleMoves = this.game.moves();

    if (this.isOver()) {
      this.emit('end', this);
      this.updateAll(this.game.fen().split(/\s+/)[0], true);
      return null;
    }

    const randomIndex = ~~(possibleMoves.length*Math.random());

    this.lastMove = this.move(possibleMoves[randomIndex]);
    this.updateAll(this.game.fen().split(/\s+/)[0]);
    return this;
  }

  go (move) {
    if (this.isOver()) {
      this.emit('end', this);
      this.updateAll(this.game.fen().split(/\s+/)[0], true);
      return null;
    }

    this.lastMove = this.move(move);
    if (this.isOver()) {
      this.emit('end', this);
      this.updateAll(this.game.fen().split(/\s+/)[0], true);
      return this;
    }else
      this.updateAll(this.game.fen().split(/\s+/)[0]);

    return this;
  }

  isOver () {
    return (this.game.game_over() || this.game.in_draw() || this.game.moves().length === 0 || this.game.insufficient_material());
  }

  updateAll (override = this.game.fen().split(/\s+/)[0], end) {
    this.updateViewFen(override);
    this.updateFrontEnd(end);
    return this;
  }

  demoIntervalStart () {
    this.demoInterval = setInterval(() => {
      if(this.randomMove() === null) {
        clearInterval(this.demoInterval);
        this.demoInterval = null;
      }
    }, 4000);
    return this.demoInterval;
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
    if((/w(?:hite)?/).test(colorBottom)) this.board.reverse();
    return str;
  }

  move (place) {
    const tempMove =  this.game.move(place, {sloppy: !0});
    if(tempMove) this.lastMove = tempMove;
    else throw new Error('Move not completed !!!11!1!111!');
    //this.handleNextCapture(this.lastMove.captured);
    this.turn = this.game.turn().replace(/w/,'White').replace(/b/,'Black');
    return this.lastMove;
  }

};

exports.ChessGame = ChessGame;
