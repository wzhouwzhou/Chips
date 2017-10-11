const CG = require('../../../rewrite-all/src/struct/games/chess/ChessGame.js').ChessGame;

const TIME = 5*60*10e3;
const STARTWAIT = 10*60*10e3;
const games = new Map();
const prompting = new Map();
const promptingAll = new Map();
const ex = {
  name: "chess",
  async func(msg, ctx) {
    let { author, reply, member, send, channel, args, prefix, client } = ctx;

    if(args[0]&&args[0]==='help'){
      const embed = new Discord.RichEmbed;
      new CG({newFen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1' , channel: msg.channel});

      [
        ['Capturing and non-pawn pieces: ', [
          'To move another piece like bishop from f1 to e2 then Bf1e2 or simply Be2',
          "If there is another piece at e1 that you want to take then you would move Bxe2",
        ].join('\n')],
        ['Castling: ', [
          'Ke1g1 and O-O do the same thing',
        ].join('\n')],
      ];
      send(embed);
      return;
    }

    let mCol, silentQuit = false;
    if(args[0]&&args[0].toLowerCase()==='join') return !0;

    if(prompting.get(author.id)) return;
    if(promptingAll.get(channel.id)) return;
    if(games.get(channel.id)) return send('There is already a game going on.');

    let othermember;

    games.set(channel.id, channel);
    try{
      othermember = await promptInvitee(ctx);
      if(othermember&&othermember.user.bot&&othermember.user.id!==client.user.id){
        send('You cannot invite that bot!');
        throw new Error('Bot invitee');
      }
      if(!othermember||!othermember.user||othermember.user.id!==client.user.id)
        othermember = await promptPlayer (author, send, prefix, channel, othermember, client);
    }catch(err){
      games.delete(channel.id);
      prompting.delete(othermember?othermember.id:0);
      promptingAll.delete(channel.id);
      prompting.delete(author.id);
      silentQuit = true;
      mCol&&mCol.stop();
      return console.error(err);
    }
    if(othermember=='decline') {
      games.delete(channel.id);
      prompting.delete(othermember.id);
      promptingAll.delete(channel.id);
      prompting.delete(author.id);
      silentQuit = true;
      mCol&&mCol.stop();
      return reply('Game was declined!');
    }
    if(othermember&&othermember.id) setTimeout(()=>{
      prompting.delete(othermember.id);
      prompting.delete(author.id);
      promptingAll.delete(channel.id);
    },1000);

    send(`Creating a chess game...`);

    console.log(`Creating a chess game for channel ${channel.id}...`);

    const currentGame = new CG({channel, players: _.shuffle([member.user, othermember.user])});
    currentGame.on('end', game => game.ended = true);
    games.set(channel.id, currentGame);
    console.log('Creating collector...');
    mCol = channel.createMessageCollector(
      q => [member.user, othermember.user].some(e => q.author.id === e.id),
      { time: TIME, errors: ['time'] }
    );
    console.log('Adding on-collect...');
    mCol.on('collect', async m => {
      if(m.author.id !== currentGame.movers.get(currentGame.turn.toLowerCase()).id) return;

      if(!m.content) return;
      //console.log(m.content);
      if(/quit/i.test(m.content)||(currentGame.isOver()&&!currentGame.ended)) {
        //currentGame.game.end();
        send('Ending…');
        currentGame.emit('ended', currentGame);
        mCol.stop();
      }

      let move = m.content
          .trim();
      let result;
      try {
        result = currentGame.go(move);
        console.log(`Pre-auto: ${move}`);
        //console.log('Game: '+result);
        if(result == 'Woah too fast!')
          return send('Too fast...');

        m.delete().catch(_=>_);
      }catch(errA){ //'Invalid move!'
        try{
          move = move.replace(/^([RNKQB])([a-h])(\w)/i, (match, a, b, c)=>a.toUpperCase()+b.toLowerCase()+c)
          .replace(/^([a-h])(\d)/i, (match, a, b) => a.toLowerCase()+b)
          .trim();

          result = currentGame.go(move);
          console.log(`Pre-auto: ${move}`);
          if(result == 'Woah too fast!')
            return send('Too fast...');
          m.delete().catch(_=>_);
        }catch(errB){
          try{
            move = move.replace(/^([RNKQB])([a-hx])(\w)/i, (match, a, b, c)=>a.toUpperCase()+b.toLowerCase()+c)
              .replace(/^([a-h])(\d)/i, (match, a, b) => a.toLowerCase()+b)
              .trim();
            result = currentGame.go(move);
            if(result == 'Woah too fast!')
              return send('Too fast...');
            m.delete().catch(_=>_);
          }catch(errC){
            if(move.length < 6)
              console.log(`Autocomplete: ${move}`);
            if(move.match(/^[RNKQB][a-h0-9]{3,4}$/))
              send('Ensure you have given a valid move');
            if(!~errB.message.indexOf('Move not completed'))
              console.error(err);
          }
        }
      }
    });

    mCol.on('end', collected => {
      if(collected.size===0)
        !silentQuit&&reply('Timed out, game was not saved to memory');

      prompting.delete(othermember.id);
      games.delete(channel.id);
      promptingAll.delete(channel.id);
      prompting.delete(author.id);
      console.log('MCol ended');
    });

    currentGame.on('ended', async () => { //game=>{
      console.log('Chess game ended');
      // game.updateFrontEnd('end');
      // game.embed = new Discord.RichEmbed()
      //   .setTitle('Connect Four')
      //   .setColor(game.player=='red'?16711680:255)
      //   .setDescription(game.toString())
      //   .addField(`Game ended!`,'\u200B');
      // await send('', {embed: game.embed});
      games.delete(channel.id);
      mCol.stop();
    });
    currentGame.updateAll();
    console.log('Chess game setup complete');
  }
};

const promptPlayer = (author, send, prefix, channel, targetMember, client) => {
  targetMember!=null&&targetMember.id!=null&&prompting.set(targetMember.id, true);
  targetMember==null&&promptingAll.set(channel.id, true);
  return new Promise( async (res,rej) => {
    const startFilter = (m) => {
      if(m.author.id === client.user.id) return res(targetMember||m.member);

      if(m.author.bot) return false;
      if((new RegExp(`${_.escapeRegExp(prefix)}chess(join|decline)`,'gi')).test(m.content.toLowerCase().replace(/\s+/g,'')))
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
      let str = `${targetMember||''} Please type __${_.escapeRegExp(prefix)}chess join__ to join the game`;
      if(targetMember) str+=` or __${_.escapeRegExp(prefix)}chess decline__`;
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
            send("You can't really be inviting yourself?");
            return false;
          }
          return res(targetMember);
        }
        else if(~m.content.indexOf('none')){
          res(null);
          return true;
        }
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

ex._games = games;
ex._prompting = prompting;
ex._promptingAll = promptingAll;

module.exports = ex;
