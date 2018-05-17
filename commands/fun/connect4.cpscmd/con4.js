/* eslint no-console: 'off'*/
const CON4 = require('connect-four');
const EventEmitter = require('events');
const snekfetch = require('snekfetch');
const _ = require('lodash');
const EMPTY = '⚫', BLUE = '🔵', RED = '🔴';
const ctitles = [
  ...[
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'keycap_ten',
  ].map(e => `:${e}:`),
  ...[
    ':11:346095871357616132',
    ':12:346095871747817473',
    ':13:346095871496028183',
    ':14:346097689529942026',
    ':15:346098630995869697',
    ':16:346099374818066452',
    ':17:346100265646292996',
    ':18:346101592493391874',
    ':19:346103612323135491',
    ':20:346103612654485505',
  ].map(e => `<${e}>`),
];
const TIME = 5 * 60 * 10e3;
const STARTWAIT = 10 * 60 * 10e3;
const games = new Map();
const prompting = new Map();
const promptingAll = new Map();
const get_ai_move = async movestr => {
  const json = (await snekfetch.get(`http://connect4.gamesolver.org/solve?pos=${movestr}`)).body.score;
  let valid_indexes = [[0, -100]];
  for (const i in json) {
    let value = +json[i];
    if (+value === 100) value = -100;

    if (valid_indexes.every(move => +value > +move[1])) {
      valid_indexes = [[+i, +value]];
    } else if (valid_indexes.every(move => +value === +move[1])) {
      valid_indexes.push([+i, +value]);
    }
  }
  return _.sample(valid_indexes)[0] + 1;
};
const ex = {
  name: 'con4',
  async func(msg, ctx) {
    let { Discord, author, reply, member, send, channel, args, prefix } = ctx;
    let mCol, silentQuit = false;
    if (args[0] && args[0].toLowerCase() === 'join') return !0;

    if (prompting.has(author.id)) return;
    if (promptingAll.has(channel.id)) return;
    if (games.has(channel.id)) return send('There is already a game going on.');

    let row, col, othermember;
    if (args[0]) {
      col = +args[0];
      if (args[1]) row = args[1];
      else row = 6;

      if (!validN(+row) || !validN(+col)) return send('Invalid board size!');
    } else {
      col = 7;
      row = 6;
    }

    col = +col;
    row = +row;

    if (col > 20) return send(`${col - 20} too many columns!`);
    if (row * col > 180) return send(`Board is too large! ${col}x${row}`);
    if (row < 4 && col < 4) return send(`Board is too small! ${col}x${row}`);

    games.set(channel.id, channel);
    try {
      othermember = await promptInvitee(ctx);
      if (othermember && othermember.user.bot && othermember.id !== '393043996320071681' && othermember.id !== '296855425255473154') {
        send('You cannot invite that bot!');
        throw new Error('Bot invitee');
      }
      othermember = await promptPlayer(author, send, prefix, channel, othermember);
    } catch (err) {
      games.delete(channel.id);
      prompting.delete(othermember ? othermember.id : 0);
      promptingAll.delete(channel.id);
      prompting.delete(author.id);
      silentQuit = true;
      if (mCol) mCol.stop();
      return console.error(err);
    }
    if (othermember === 'decline') {
      games.delete(channel.id);
      prompting.delete(othermember.id);
      promptingAll.delete(channel.id);
      prompting.delete(author.id);
      silentQuit = true;
      mCol && mCol.stop();
      return reply('Game was declined!');
    }
    if (othermember && othermember.id) {
      setTimeout(() => {
        prompting.delete(othermember.id);
        prompting.delete(author.id);
        promptingAll.delete(channel.id);
      }, 1000);
    }
    if (othermember.id === '296855425255473154' && col !== 7 && row !== 6) return send('You may only play against me on a 7x6 board');
    send(`Creating a ${col} x ${row} con4 game...`);

    console.log(`Creating a ${col} x ${row} con4 game for channel ${channel.id}...`);

    const currentGame = new C4Game(channel, ..._.shuffle([member.user, othermember.user]), row, col);
    games.set(channel.id, currentGame);
    console.log('Creating collector...');
    mCol = channel.createMessageCollector(
      query => !!query.content.match(/(quit|stop|forfeit)/i) || (!!query.content.match(/\d+/g) && query.content.match(/\d+/g)[0] && query.content.match(/\d+/g)[0].length === query.content.length),
      { time: TIME, errors: ['time'] }
    );
    console.log('Adding on-collect...');
    mCol.on('collect', async m => {
      if (m.author.id !== currentGame.nowPlaying.id) return false;

      if (!m.content) return false;
      console.log(m.content);
      if (/quit/i.test(m.content.toLowerCase())) {
        m.channel.send(new Discord.MessageEmbed().setTitle(`${m.author.tag} forfeit!`).setColor(0xFF0000));
        currentGame.game.end();
        currentGame.emit('ended', currentGame);
        return mCol && mCol.stop();
      }

      const num = m.content.match(/\d+/) ? m.content.match(/\d+/)[0] : -1;
      if (num === '-1' || num === -1) {
        console.log('Invalid num');
        return false;
      }
      console.log(`Num: ${num}`);
      try {
        let result = await currentGame.playGame(+num);
        console.log(`Game: ${result}`);
        if (result === 'Woah too fast!') {
          return send('Too fast...');
        }
        return m.delete().catch(_ => _);
      } catch (err) {
        return console.error(err);
      }
    });

    mCol.on('end', collected => {
      if (collected.size === 0) {
        if (!silentQuit) this._msg.reply('Timed out, game was not saved to memory');
        prompting.delete(othermember.id);
        games.delete(channel.id);
        promptingAll.delete(channel.id);
        prompting.delete(author.id);
      }
      console.log('MCol ended');
    });

    currentGame.on('ended', async game => {
      console.log('Con4 game ended');
      game.currentMsg.delete().catch(_ => _);
      game.embed = new Discord.MessageEmbed()
        .setTitle('Connect Four')
        .setColor(game.player == 'red' ? 16711680 : 255)
        .setAuthor(`${game.player1 ? game.player1.tag : ''}${RED} vs ${BLUE}${game.player2 ? game.player2.tag : ''}`)
        .setDescription(game.toString())
        .addField(`Game ended`, game.movestr === '' ? game.player1.tag + ' won!' : game.ended && !game.winner ?  'It was a tie!' : (game.reverse_player[game.player] || game.player1.tag) + ' won!');
      await send('', { embed: game.embed });
      games.delete(channel.id);
      mCol && mCol.stop();
    });
    console.log('Con4 game setup complete');
  },
};

const C4Game = class C4Game extends EventEmitter {
  constructor(tc, player1, player2, row = 6, col = 7) {
    super();
    this.updatable = true;
    this.movestr = '';
    this.tc = tc;
    this.player1 = player1;
    this.player2 = player2;
    this.ai = [player1, player2].find(player => player.id === '296855425255473154') || {};
    console.log(`Connect4 game created with AI ${this.ai.id}`);
    this.nowPlaying = player1;
    this.reverse_player = {
      Red: player1.tag,
      red: player1.tag,
      Blue: player2.tag,
      blue: player2.tag,
    };
    this.game = new CON4({
      rows: row,
      cols: col,
    });
    this.cols = col;
    this.board = this.createBoard(col, row);
    this.send().then(() => {
      if (this.ai.id === this.nowPlaying.id) {
        setTimeout(() => get_ai_move(this.movestr).then(move => this.playGame(move)), 1250);
      }
    });
  }

  createBoard(c = 7, r = 6) {
    this.board = new Array(r);
    for (let i = 0; i < this.board.length; i++) this.board[i] = new Array(c).fill(EMPTY);

    this._columns = new Array(c + 1).fill(0);
    this._columns[0] = r + 1;
    return this.board;
  }

  setC(r, c, color) {
    let b = this.board.reverse();
    color == 'red' ? b[r - 1][c - 1] = RED : b[r - 1][c - 1] = BLUE;
    b = this.board.reverse();
    this._columns[c]++;
    return b;
  }

  playCol(col, color) {
    if (this._columns[col] > this._columns[0]) return false;
    return this.setC(this._columns[col] + 1, col, color);
  }

  async playGame(col) {
    this.movestr += col;
    if (!this.updatable) return 'Woah too fast!';
    this.updatable = false;
    if (this.checkEnded()) {
      this.updatable = true;
      return true;
    }
    if (!this.game.validMove(col - 1)) {
      this.updatable = true;
      throw new Error('Invalid move');
    }
    this.player = !this.player || this.player === 'blue' ? 'red' : 'blue';
    this.nowPlaying = this.nowPlaying.id === this.player1.id ? this.player2 : this.player1;
    this.game.play(this.player, col - 1);
    this.playCol(col, this.player);
    this.last_move = col;
    if (!this.checkEnded()) {
      return this.send().then(() => {
        this.updatable = true;
        if (this.ai.id === this.nowPlaying.id) {
          setTimeout(() => get_ai_move(this.movestr).then(move => this.playGame(move)), 1250);
        }
      });
    } else {
      this.updatable = true;
      return true;
    }
  }

  checkEnded() {
    if (this.game.ended) {
      this.ended = true;
      this.emit('ended', this);
      return 'Game has ended!';
    }
    return false;
  }

  toString() {
    return `${ctitles.slice(0, this.cols).join('')}\n${this.board.map(r => r.join('')).join('\n')}`;
  }

  embedify() {
    this.embed = new Discord.MessageEmbed()
      .setTitle('Connect Four')
      .setColor(this.player == 'red' ? 16711680 : 255)
      .setAuthor(`${this.player1 ? this.player1.tag : ''}${RED} vs ${BLUE}${this.player2 ? this.player2.tag : ''}`)
      .setDescription(this.toString())
      .addField(`${this.player && this.player === 'red' ? this.reverse_player['Blue'] : this.reverse_player['Red']} to move.`, `Last Move: ${this.last_move || 'None'}`)
      .setFooter('Type the column number to move');
  }

  send() {
    return new Promise(async res => {
      if (!this.tc) return res(false);
      this.embedify();
      this.currentMsg && this.currentMsg.delete().catch(_ => _);
      this.currentMsg = await this.tc.send('', { embed: this.embed });
      res(this.currentMsg);
    });
  }
};

const Con4Player = class Con4Player {
  constructor(userid, guild, c, host) {
    this.member = guild.members.get(userid);
    this.color = c;
    this.host = host;
  }

  get name() {
    return this.member.user.tag;
  }
};

const promptPlayer = (author, send, prefix, channel, targetMember) => {
  targetMember != null && targetMember.id != null && prompting.set(targetMember.id, true);
  targetMember == null && promptingAll.set(channel.id, true);
  return new Promise(async(res, rej) => {
    if (targetMember.id === '296855425255473154') return res(targetMember);
    const startFilter = m => {
      if (m.author.bot) return false;
      if ((new RegExp(`${_.escapeRegExp(prefix)}con4(join|decline)`, 'gi')).test(m.content.toLowerCase().replace(/\s+/g, ''))) {
        if (m.author.id !== author.id) {
          if (!targetMember || targetMember.id === m.author.id) {
            if (~m.content.toLowerCase().indexOf('join')) return res(targetMember || m.member);
            else if (targetMember && !!~m.content.toLowerCase().indexOf('decline')) return res('decline');
          }
          return false;
        }
      }

      return false;
    };

    let startCol;
    try {
      let str = `${targetMember || ''} Please type __${_.escapeRegExp(prefix)}con4 join__ to join the game`;
      if (targetMember) str += ` or __${_.escapeRegExp(prefix)}con4 decline__`;
      await send(str);
      startCol = await channel.awaitMessages(startFilter, { max: 1, time: STARTWAIT, errors: ['time'] });
    } catch (err) {
      console.error(err);
      return rej('Timed out');
    }

    !startCol.first() && rej(null);
  });
};

const promptInvitee = ({ send, channel, author }) => new Promise(async(res, rej) => {
  let targetMember;

  const startFilter = m => {
    if (m.author.bot) return false;
    if (m.author.id === author.id) {
      targetMember = m.mentions.members.first();
      if (targetMember) {
        if (targetMember.id === author.id) {
          send('You can\'t really be inviting yourself?');
          return false;
        }
        return res(targetMember);
      } else if (~m.content.indexOf('none')) {
        res(null);
        return true;
      }
      return false;
    }
    return false;
  };

  let startCol;
  try {
    await send(`${author || ''} Please mention who you want to invite to this game, or __none__ to allow anyone to join`);
    startCol = await channel.awaitMessages(startFilter, { max: 1, time: STARTWAIT, errors: ['time'] });
  } catch (err) {
    console.error(err);
    return rej('Timed out');
  }

  if (!startCol.first()) return rej(null);
  res(startCol.first().mentions.members.first() || startCol.first().content);
});

const validN = n => +n === n && n === (n | 0) && n > 0;

ex._games = games;
ex._prompting = prompting;

module.exports = ex;
