'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { Chess } = require('chess.js');
const AI = require('chess-ai-kong');
const _ = require('lodash');
AI.setOptions({
  depth: _.random(500,600),
  strategy: 'basic',
  timeout: 0
});

const Discord = require('discord.js');

// const lastF = require('../../../deps/functions/lastF').default({_});
const Constants = require('../../../deps/Constants');

const ChessConstants = Constants.chess;
const {W, B, chessPieces: pieces, startFen, label2} = ChessConstants;
const files = new Array(8).fill(0).map((e,i)=>String.fromCharCode('A'.charCodeAt(0) + i));

const AIRAND = 1;
const games = new Map;

const ChessGame = class ChessGame extends require('../BoardGame').BoardGame {
  constructor(options) {
    super({
      gameName: 'Chess',
      maxPlayers: 2,
      guildOnly: true,
      channelID: options.channel?options.channel.id:0,
      empty: null,
    });
    games.set(this.channelID, this);
    this.players = options.players || [];
    this.players = [...this.players, ...[null,null]];
    if(this.players.find(e=> e && e.id===client.user.id ))
      this.aiOptions = options.aiOptions || AIRAND;
    this.movers = new Map;
    this.movers.set('white',this.players[0]);
    this.movers.set('black',this.players[1]);
    this.turn = 'White';

    this.channel = options.channel;
    this.game = new Chess(options.newFen||startFen);
    this.board = new Array(8).fill(0);
    this.embed = new Discord[/^[^]*12\.\d+[^]*$/.test(Discord.version)?'MessageEmbed':'RichEmbed'];
    this.fen = options.newFen||startFen;
    this.boardFen = this.fen.split(/\s+/)[0];

    if(this.movers.get(this.turn.toLowerCase())&&this.movers.get(this.turn.toLowerCase()).id === client.user.id)
      this.aiMove(0, {noUpdate: true});
  }

  embedify (end = false) {
    if(!this.embed) throw new Error('Embed is missing !!11!1!!!!');
    this.embed = new (this.embed.constructor);
    this.embed.addField(end?this.game.in_draw()?'The game was a draw!': this.turn? `${this.movers.get(this.turn.toLowerCase())? this.movers.get(this.turn.toLowerCase()==='white'?'black':'white').username: this.turn} won!` :`${this.movers.get(this.turn.toLowerCase())? this.movers.get(this.turn.toLowerCase()).username: this.turn} to move`:'White to move' ,`Last move: ${this.game.history()&&this.game.history()[0]?this.game.history().reverse()[0]:'None'}`);
    this.embed.setDescription(this.toString());
    this.embed.setAuthor('Chess');
    this.embed.setTitle(`${this.movers.get('white').username}⬜ vs ⬛${this.movers.get('black').username}`);
    return this.embed;
  }

  updateFrontEnd (end) {
    if(!this.channel) throw new Error('Channel is missing !!!11!');
    const embed = this.embedify(end);
    if(this.lastM) {
      this.lastM.delete();
      this.lastM = null;
    }

    this.channel.send(embed).then(m=>this.lastM = m);
    return this;
  }

  aiMove (delay = 0, options = {}) {
    if (this.ended||this.isOver()) return null;
    if(!delay) {
        const move = AI.play(this.game.history());
      try {
        return this.go(move, true, options.noUpdate);
      } catch(err) { //AI Failed
        console.log(err);
        this.channel.send('Something went wrong with the AI…attempting to fix');
        try {
          return this.randomMove(0, options);
        } catch(errB) {
          this.channel.send('The AI was unable to continue the game… you win!');
          this.emit('end', this);
          if(!this.ended&&!options.noUpdate)
            this.updateAll(this.game.fen().split(/\s+/)[0], true);
          this.ended = true;
          return null;
        }
      }
    } else setTimeout(() =>
      this.aiMove(0, options)
    , delay);
  }

  randomMove (delay, options) {
    if (this.isOver()) return this;

    if(!delay) {
      const possibleMoves = this.game.moves();
      const randomIndex = ~~(possibleMoves.length*Math.random());
      return this.go(possibleMoves[randomIndex], true, options.noUpdate);
    } else setTimeout(() =>
      this.randomMove()
    , delay);
  }

  go (move, stopBot, noUpdate) {
    if (this.isOver()) {
      this.emit('end', this);
      if(!this.ended&&!noUpdate)
        this.updateAll(this.game.fen().split(/\s+/)[0], true);
      this.ended = true;
      return null;
    }

    this.lastMove = this.move(move);
    if(!stopBot&&this.aiOptions&&!this.isOver())
      this.aiMove(2000, {noUpdate: false});

    if (this.isOver()) {
      this.emit('end', this);
      if(!this.ended&&!noUpdate)
        this.updateAll(this.game.fen().split(/\s+/)[0], true);
      this.ended = true;
      return this;
    }else if(!noUpdate)
      this.updateAll(this.game.fen().split(/\s+/)[0]);

    return this;
  }

  isOver () {
    return this.game.history()&&this.game.history().length>0&&(this.ended || this.game.game_over() || this.game.in_draw() || this.game.moves().length === 0 || this.game.insufficient_material());
  }

  updateAll (override = this.game.fen().split(/\s+/)[0], end) {
    this.updateViewFen(override);
    this.updateFrontEnd(end);
    return this;
  }

  demoIntervalStart () {
    this.demoInterval = setInterval(() => {
      if(this.isOver() || this.aiMove() === null) {
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
    return this;
  }

  toString(colorBottom='white'/*this.game.turn()*/) {
    if((/w(?:hite)?/).test(colorBottom)) this.board.reverse();
    let str = this.board.map((e,i)=>[Constants.numbersA[i+1]].concat(Object.keys(e).map(k=>e[k])).join('')).reverse().concat(label2.join('')).join('\n');
    if((/w(?:hite)?/).test(colorBottom)) this.board.reverse();
    return str;
  }

  move (place) {
    const tempMove =  this.game.move(place, {sloppy: !0});
    const newT = this.game.turn().replace(/w/,'White').replace(/b/,'Black');

    if(tempMove) this.lastMove = tempMove;
    else throw new Error('Move not completed !!!11!1!111!');
    //this.handleNextCapture(this.lastMove.captured);
    this.turn = newT;
    return this.lastMove;
  }

};

exports.ChessGame = ChessGame;
exports.games = games;
