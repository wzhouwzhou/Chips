const CON4 = require('connect-four');
const EventEmitter = require('events');

const EMPTY = '⚫', BLUE = '🔵', RED = '🔴';
const TIME = 5*60*10e3;
const STARTWAIT = 10*60*10e3;
const games = new Map();
const prompting = new Map();

const ex = {
  name: "con4",
  async func(msg, ctx) {
    let {Discord, author, reply, member, send, channel, args, prefix } = ctx;
    if(prompting.has(author.id)) return;

    if(games.has(channel.id)) return send('There is already a game going on.');

    let row, col, othermember;
    if(args[0]){
      col = +args[0];
      if(args[1]) row = args[1];
      else row = 6;

      if(!validN(+row)||!validN(+col)&&args[0].toLowerCase()!=='join')
        return send('Invalid board size!');
    }else{
      col = 7;
      row = 6;
    }

    col = +col;
    row = +row;

    if(col>20) return send(`${col-20} too many columns!`);
    if(row*col>190) return send(`Board is too large! ${col}x${row}`);

    games.set(channel.id, channel);
    try{
      othermember = await promptInvitee(ctx);
      othermember = await promptPlayer (author, send, prefix, channel, othermember);
    }catch(err){
      games.delete(channel.id);
      return console.error(err);
    }
    if(othermember=='decline') {
      games.delete(channel.id);
      return reply('Game was declined!');
    }
    if(othermember&&othermember.id) setTimeout(()=>prompting.delete(othermember.id),1000);

    send(`Creating a ${col} x ${row} con4 game...`);

    console.log(`Creating a ${col} x ${row} con4 game for channel ${channel.id}...`);

    const currentGame = new C4Game(channel, member.user, othermember.user, row, col);
    games.set(channel.id, currentGame);
    console.log('Creating collector...');
    const mCol = channel.createMessageCollector(
      query => (!!query.content.match(/\d+/g))&&query.content.match(/\d+/g)[0]&&query.content.match(/\d+/g)[0].length===query.content.length,
      { time: TIME, errors: ['time'] }
    );
    console.log('Adding on-collect...');
    mCol.on('collect', async m => {
      if(!m.content) return;
      console.log(m.content);
      if(/^quit$/i.test(m.content)) currentGame.game.end();

      const num = m.content.match(/\d+/)?m.content.match(/\d+/)[0]:-1;
      if(num==='-1'||num==-1){
        console.log('Invalid num');
        return;
      }
      console.log('Num: '+num);
      try {
        result = currentGame.playGame(+num);
        console.log('Game: '+result);
        if(result == 'Woah too fast!'){
          return send('Too fast...');
        }
        m.delete().catch(_=>_);
      }catch(err){ //'Invalid move!'
        console.error(err);
      }
    });

    mCol.on('end', collected => {
      if(collected.size===0){
        this._msg.reply('Timed out, game was not saved to memory');
        games.delete(channel.id);
      }
      console.log('MCol ended');
    });

    currentGame.on('ended', async game=>{
      console.log('Con4 game ended');
      game.currentMsg.delete().catch(_=>_);
      game.embed = new Discord.RichEmbed()
        .setTitle('Connect Four')
        .setColor(game.player=='red'?16711680:255)
        .setAuthor(`${game.player1?'('+game.player1.tag+')':''}Red vs ${game.player2?'('+game.player2.tag+')':''}Blue`)
        .setDescription(game.toString())
        .addField(`Game ended!`,'\u200B');
      await send('', {embed: game.embed});
      games.delete(channel.id);
      mCol.stop();
    });
    console.log('Con4 game setup complete');
  }
};

const C4Game = class C4Game extends EventEmitter {
  constructor(tc, player1, player2, row=6, col=7){
    super();
    this.updatable = true;
    this.tc = tc;
    this.player1 = player1;
    this.player2 = player2;
    this.game = new CON4({
      rows: row,
      cols: col,
    });
    this.board = this.createBoard(col,row);
    this.send();
  }

  createBoard (c=7,r=6) {
    this.board = new Array(r);
    for(let i=0; i< this.board.length; i++)
      this.board[i]=new Array(c).fill(EMPTY);

    this._columns = new Array(c+1).fill(0);
    this._columns[0] = r+1;
    return this.board;
  }

  setC (r,c, color) {
    let b = this.board.reverse();
    color=='red'?b[r-1][c-1]=RED:b[r-1][c-1]=BLUE;
    b = this.board.reverse();
    this._columns[c]++;
    return b;
  }

  playCol (col, color) {
    if(this._columns[col]>this._columns[0]) return false;
    return this.setC(this._columns[col]+1,col, color);
  }

  playGame (col) {
    if(!this.updatable) return 'Woah too fast!';
    this.updatable = false;
    if(this.checkEnded()) return this.updatable=true;
    this.player= (!this.player||this.player==='blue')?'red':'blue';
    if(!this.game.validMove(col-1)) {
      this.updatable=true;
      throw new Error('Invalid move');
    }
    this.game.play(this.player, col-1);
    this.playCol(col, this.player);
    if(!this.checkEnded())
      this.send().then(()=>this.updatable = true);
    else this.updatable=true;
  }

  checkEnded () {
    if(this.game.ended){
      this.ended = true;
      this.emit('ended', this);
      return 'Game has ended!';
    }
    return false;
  }

  toString () {
    return this.board.map(r=>r.join('')).join('\n');
  }

  embedify () {
    this.embed = new Discord.RichEmbed()
      .setTitle('Connect Four')
      .setColor(this.player=='red'?16711680:255)
      .setAuthor(`${this.player1?'('+this.player1.tag+')':''}Red vs ${this.player2?'('+this.player2.tag+')':''}Blue`)
      .setDescription(this.toString())
      .addField(`${this.player&&this.player=='red'?'Blue':'Red'} to move.`,'\u200B');
  }

  send () {
    return new Promise( async res => {
      if(!this.tc) return res(false);
      this.embedify();
      this.currentMsg&& this.currentMsg.delete().catch(_=>_);
      this.currentMsg = await this.tc.send('',{embed: this.embed});
      res(this.currentMsg);
    });
  }
};

const Con4Player = class Con4Player {
  constructor(userid, guild, c, host){
    this.member = guild.members.get(userid);
    this.color = c;
    this.host = host;
  }

  get name () {
    return this.member.user.tag;
  }
};

const promptPlayer = (author, send, prefix, channel, targetMember) => {
  targetMember!=null&&targetMember.id!=null&&prompting.set(targetMember.id, true);
  return new Promise( async (res,rej) => {
    const startFilter = (m) => {
      if(m.author.bot) return false;
      if((new RegExp(`${_.escapeRegExp(prefix)}con4(join|decline)`,'gi')).test(m.content.toLowerCase().replace(/\s+/g,'')))
        if(m.author.id !== author.id) {
            if((!targetMember)||targetMember.id===m.author.id)
              if(~m.content.toLowerCase().indexOf('join'))
                return res(targetMember||m.member);
              else if(targetMember&&!!~m.content.toLowerCase().indexOf('decline'))
                return res('decline');
          return false;
        }

      return false;
    };

    let startCol;
    try{
      let str = `${targetMember||''} Please type __${_.escapeRegExp(prefix)}con4 join__ to join the game`;
      if(targetMember) str+=` or __${_.escapeRegExp(prefix)}con4 decline__`;
      await send(str);
      startCol = await channel.awaitMessages(startFilter, { max: 1, time: STARTWAIT, errors: ['time'] });
    }catch(err){
      console.error(err);
      return rej('Timed out');
    }

    !startCol.first() && rej(null);
  });
};

const promptInvitee = ({send, channel, author}) => {
  return new Promise ( async (res,rej) => {
    let targetMember;

    const startFilter = (m) => {
      if(m.author.bot) return false;
      if(m.author.id === author.id) {
        targetMember=m.mentions.members.first();
        if(targetMember){
          if(targetMember.id===author.id) {
            send('You can\'t really be inviting yourself?');
            return false;
          }
          return res(targetMember);
        }
        else if(~m.content.indexOf('none'))
          return res(null);
        return false;
      }
      return false;
    };

    let startCol;
    try{
      await send(`${author||''} Please mention who you want to invite to this game, or __none__ to allow anyone to join`);
      startCol = await channel.awaitMessages(startFilter, { max: 1, time: STARTWAIT, errors: ['time'] });
    }catch(err){
      console.error(err);
      return rej('Timed out');
    }

    if(!startCol.first()) return rej(null);
    res(startCol.first().mentions.members.first()||startCol.first().content);
  });
};

const validN = n => (+n)===n&&n===(n|0)&&n>0;

ex._games = games;
ex._prompting = prompting;

module.exports = ex;
