'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const path = require('path');

const { Chess } = require('chess.js');
const { Engine } = require('node-uci');

const BasicAI = require('chess-ai-kong');

const AIBasic = 0, AIEasy = 1, AIMedium = 2, AIHard = 5, AIExtreme = 13;
const AIBasicD = 0, AIEasyD = 1, AIMediumD = 1, AIHardD = 4, AIExtremeD = 6;

BasicAI.setOptions({
  /* depth: AIBasicD, */
  strategy: 'random',
  timeout: 0,
});

const Discord = require('discord.js');
const _ = require('lodash');
const firstF = require('../../../deps/functions/firstF').default({ _ });
const Constants = require('../../../deps/Constants');

const ChessConstants = Constants.chess;
const { W, B, chessPieces: pieces, startFen, label2 } = ChessConstants;
const files = new Array(8).fill(0).map((e, i) => String.fromCharCode('A'.charCodeAt(0) + i));
const rot = '🔄', undo = '↩';

exports.difficulties = [
  AIBasic,
  AIEasy,
  AIMedium,
  AIHard,
  AIExtreme,
];
exports.depths = [
  AIBasicD,
  AIEasyD,
  AIMediumD,
  AIHardD,
  AIExtremeD,
];

const games = new Map;

const ChessGame = class ChessGame extends require('../BoardGame').BoardGame {
  constructor(options) {
    super({
      gameName: 'Chess',
      maxPlayers: 2,
      guildOnly: true,
      channelID: options.channel ? options.channel.id : 0,
      empty: null,
    });
    games.set(this.channelID, this);
    this.players = options.players || [];
    this.players = [...this.players, ...[null, null]];
    if (this.players.find(e => e && e.id === client.user.id)) {
      this.aiOptions = 'aiOptions' in options ? options.aiOptions : AIEasy;
      this.aiDepth = exports.depths[exports.difficulties.indexOf(this.aiOptions)];
      this.undoable = true;
    }
    this.movers = new Map;
    this.movers.set('white', this.players[0]);
    this.movers.set('black', this.players[1]);
    this.turn = 'White';

    this.channel = options.channel;
    this.game = new Chess(options.newFen || startFen);
    this.board = new Array(8).fill(0);
    this.embed = new Discord[/^[^]*12\.\d+[^]*$/.test(Discord.version) ? 'MessageEmbed' : 'RichEmbed'];
    this.fen = options.newFen || startFen;
    this.boardFen = this.fen.split(/\s+/)[0];
    this.sideDown = 'white';
  }

  static async factory(opts) {
    const game = new this(opts);
    await game.aiSetup(game.aiOptions);
    if (game.movers.get(game.turn.toLowerCase()) &&
    game.movers.get(game.turn.toLowerCase()).id === opts.client.user.id) {
      game.sideDown = 'black';
      await game.aiMove(0, { noUpdate: true });
    }
    return game;
  }

  embedify(end = false) {
    if (!this.embed) throw new Error('Embed is missing !!11!1!!!!');
    this.embed = new this.embed.constructor;
    let comment = '';
    if (end) {
      if (this.game.in_draw()) {
        comment += 'The game was a draw';
      } else if (this.turn &&
        this.movers.get(this.turn.toLowerCase())) {
        comment += `${this.movers.get(this.turn.toLowerCase() === 'white' ? 'black' : 'white').username} won`;
      }
      comment += ` after ${Math.ceil(this.game.history().length / 2)} moves!`;
    } else {
      if (this.movers.get(this.turn.toLowerCase())) comment += this.movers.get(this.turn.toLowerCase()).username;
      else comment += this.turn;
      comment += ' to move';
    }
    this.embed.addField(comment,
      `Last move: ${this.game.history() && this.game.history()[0] ?
        this.game.history().reverse()[0] :
        'None'}`
    );
    this.embed.setDescription(this.toString());
    this.embed.setAuthor('Chess');
    this.embed.setTitle(`${this.movers.get('white').username}⬜ vs ⬛${this.movers.get('black').username}`);
    return this.embed;
  }

  undo() {
    if (!this.undoable) return false;
    if (this.game.history().length < 2) return this;
    this.game.undo();
    this.game.undo();
    return this.updateAll();
  }

  updateFrontEnd(end) {
    if (!this.channel) throw new Error('Channel is missing !!!11!');
    let embed = this.embedify(end);
    if (this.lastM) {
      this.lastM.delete();
      this.lastM = null;
    }

    if (!this.nextEdit) {
      this.channel.send(embed).then(m => {
        this.lastM = m;
        if (!end) {
          const mover = this.movers.get(this.turn.toLowerCase());
          const f = (r, u) => {
            if (!u.bot && mover && u.id === mover.id && (r.emoji.name === rot || r.emoji.name === undo)) {
              r.remove(u).catch(__ => __);
              return true;
            }
            return false;
          };
          const rCol = m.createReactionCollector(f, { time: 200e3, errors: ['time'] });
          this.rCol = rCol;
          rCol.on('collect', r => {
            if (r.emoji.name === rot) {
              this.nextEdit = true;
              this.sideDown = this.sideDown === 'white' ? 'black' : 'white';
              embed = this.embedify(end);
              m.edit(embed);
              this.nextEdit = false;
            } else if (r.emoji.name === undo && this.undoable) {
              this.undo().catch(console.error);
            }
          });
          if (!this.pause) {
            m.react(rot).then(() => {
              if (!this.pause && this.undoable) m.react(undo);
            });
          }
        }
      });
    }
    return this;
  }

  async aiSetup(difficulty = (this.aiOptions || AIMedium)) {
    this.AI = new Engine(path.join(__dirname, '../../../deps/chess-engines/stockfish-8-linux/Linux/stockfish_8_x64'));
    await this.AI.init();
    await this.AI.setoption('Slow Mover', 10);
    await this.AI.setoption('Threads', 2);
    await this.AI.setoption('MultiPV', 1);
    await this.AI.setoption('hash', 32);
    await this.AI.setoption('Skill Level', Math.max(0, Math.min(difficulty + 1, 20)));
    return { AI: this.AI, BasicAI };
  }

  async aiMove(delay = 0, options = {}) {
    if (this.ended || this.isOver()) return null;
    if (!delay) {
      await this.AI.isready();
      await this.AI.position(this.game.fen());
      let move;
      if (this.aiOptions === AIBasic) {
        move = BasicAI.play(this.game.history());
      } else {
        move = (await this.AI.go({ depth: this.aiDepth || AIMediumD })).bestmove;
      }
      try {
        return this.go(move, true, options.noUpdate);
      } catch (err) {
        // AI Failed
        console.log(err);
        this.channel.send('Something went wrong with the AI…attempting to fix').then(m => m.delete({ timeout: 7500 }));
        try {
          return this.aiRandomMove(0, options);
        } catch (errB) {
          this.channel.send('The AI was unable to continue the game… you win!');
          this.emit('end', this);
          if (!this.ended && !options.noUpdate) this.updateAll(this.game.fen().split(/\s+/)[0], true);
          this.ended = true;
          return null;
        }
      }
    } else {
      return setTimeout(() => this.aiMove(0, options), delay);
    }
  }

  aiRandomMove(delay, options) {
    if (this.isOver()) return this;

    if (!delay) {
      const possibleMoves = this.game.moves();
      const randomIndex = ~~(possibleMoves.length * Math.random());
      return this.go(possibleMoves[randomIndex], true, options.noUpdate);
    } else {
      return setTimeout(() => this.aiRandomMove(), delay);
    }
  }

  go(move, stopBot, noUpdate) {
    if (this.isOver()) {
      this.emit('end', this);
      if (!this.ended && !noUpdate) this.updateAll(this.game.fen().split(/\s+/)[0], true);
      this.ended = true;
      return null;
    }

    this.lastMove = this.move(move);
    if (!stopBot && 'aiOptions' in this && !this.isOver()) this.aiMove(2000, { noUpdate: false });

    if (this.isOver()) {
      this.emit('end', this);
      if (!this.ended && !noUpdate) this.updateAll(this.game.fen().split(/\s+/)[0], true);
      this.ended = true;
      return this;
    } else if (!noUpdate) { this.updateAll(this.game.fen().split(/\s+/)[0]); }

    return this;
  }

  isOver() {
    return this.game.history() &&
    this.game.history().length > 0 &&
    (this.ended ||
     this.game.game_over() ||
     this.game.in_draw() ||
     this.game.moves().length === 0 ||
     this.game.insufficient_material()
    );
  }

  updateAll(override = this.game.fen().split(/\s+/)[0], end) {
    this.updateViewFen(override);
    this.updateFrontEnd(end);
    return this;
  }

  demoIntervalStart() {
    this.demoInterval = setInterval(() => {
      if (this.isOver() || this.aiMove() === null) {
        clearInterval(this.demoInterval);
        this.demoInterval = null;
      }
    }, 4000);
    return this.demoInterval;
  }


  updateViewFen(fen = this.game.fen().split(/\s+/)[0]) {
    if (!this.board) throw new Error('Board not initiated ?!?!?!1!!1!');

    const all = fen.replace(/\d+/g, e => 'A'.repeat(+e)).split(/\s+/)[0].split('/').map(e => e.split(''));

    for (const c in all) {
      if (!this.board[c]) this.board[c] = {};

      for (let i = 0; i < all[c].length; i++) {
        this.board[c][files[i]] = all[c][i] === 'A' ?
          c % 2 === i % 2 ? W : B :
          pieces.get(`${
                      all[c][i].toLowerCase()
                     }${
                      all[c][i].toLowerCase() === all[c][i] ? 'b' : 'w'
                     }${
                       c % 2 === i % 2 ? 'w' : 'b'
                     }`
          );
      }
    }
    return this;
  }

  toString(colorBottom = (this.sideDown || this.game.turn())) {
    this.board.reverse();
    let str;
    if ((/w(?:hite)?/i).test(colorBottom)) {
      str =
        this.board.map(
          (e, i) => [firstF(Constants.numbersA, 9)[i + 1]].concat(Object.keys(e).map(k => e[k])).join('')
        )
          .reverse().concat(
            label2.join('')
          )
          .join('\n');
    } else {
      str =
        this.board.map(
          (e, i) => [Object.assign(
              [],
              firstF(Constants.numbersA, 10))[i + 1]]
                .concat(Object.keys(e)
                .map(k => e[k])
                .reverse())
                .join('')
        ).concat(
          (([a, ...b]) => [...b, a])(Object.assign([], label2))
            .reverse()
            .join('')
        ).join('\n');
    }
    this.board.reverse();

    return str;
  }

  move(place) {
    const tempMove = this.game.move(place, { sloppy: !0 });
    const newT = this.game.turn().replace(/w/, 'White').replace(/b/, 'Black');

    if (tempMove) this.lastMove = tempMove;
    else throw new Error('Move not completed !!!11!1!111!');
    // This.handleNextCapture(this.lastMove.captured);
    this.turn = newT;
    return this.lastMove;
  }
};

exports.ChessGame = ChessGame;
exports.games = games;
