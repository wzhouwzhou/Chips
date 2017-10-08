const CG = require('../../../rewrite-all/src/struct/games/chess/ChessGame.js').ChessGame;

const TIME = 5*60*10e3;
const STARTWAIT = 10*60*10e3;
const games = new Map();
const prompting = new Map();
const promptingAll = new Map();
const ex = {
  name: "chess",
  async func(msg, ctx) {
    let {Discord, author, reply, member, send, channel, args, prefix } = ctx;
    let mCol, silentQuit = false;
    if(args[0]&&args[0].toLowerCase()==='join') return !0;

    if(prompting.has(author.id)) return;
    if(promptingAll.has(channel.id)) return;
    if(games.has(channel.id)) return send('There is already a game going on.');

    let othermember;

    games.set(channel.id, channel);
    try{
      othermember = await promptInvitee(ctx);
      if(othermember&&othermember.user.bot){
        send('You cannot invite a bot!');
        throw new Error('Bot invitee');
      }
      othermember = await promptPlayer (author, send, prefix, channel, othermember);
    }catch(err){
      games.delete(channel.id);
      prompting.delete(othermember?othermember.id:0);
      promptingAll.delete(channel.id);
      prompting.delete(author.id);
      silentQuit = true;
      mCol.stop();
      return console.error(err);
    }
    if(othermember=='decline') {
      games.delete(channel.id);
      prompting.delete(othermember.id);
      promptingAll.delete(channel.id);
      prompting.delete(author.id);
      silentQuit = true;
      mCol.stop();
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

    games.set(channel.id, currentGame);
    console.log('Creating collector...');
    mCol = channel.createMessageCollector(
      () => true/*query => (!!query.content.match(/(quit|stop|forfeit)/i))||((!!query.content.match(/\d+/g))&&query.content.match(/\d+/g)[0]&&query.content.match(/\d+/g)[0].length===query.content.length)*/,
      { time: TIME, errors: ['time'] }
    );
    console.log('Adding on-collect...');
    mCol.on('collect', async m => {
      //if(m.author.id!=currentGame.nowPlaying.id) return;

      if(!m.content) return;
      console.log(m.content);
      if(/quit/i.test(m.content)) {
        //currentGame.game.end();
        send('Ending…');
        currentGame.emit('ended', currentGame);
        mCol.stop();
      }

      const move = m.content.replace(/[rnkqb]/g,e=>e.toUpperCase());

      try {
        result = currentGame.go(move);
        console.log('Game: '+result);
        if(result == 'Woah too fast!'){
          return send('Too fast...');
        }
        m.delete().catch(_=>_);
      }catch(err){ //'Invalid move!'
        if(move.match(/^[rnkqb]\w{3,3}$/)) send('Ensure you have given a valid move');
        console.error(err);
      }
    });

    mCol.on('end', collected => {
      if(collected.size===0){
        !silentQuit&&his._msg.reply('Timed out, game was not saved to memory');
        prompting.delete(othermember.id);
        games.delete(channel.id);
        promptingAll.delete(channel.id);
        prompting.delete(author.id);
      }
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
    console.log('Chess game setup complete');
  }
};

const promptPlayer = (author, send, prefix, channel, targetMember) => {
  targetMember!=null&&targetMember.id!=null&&prompting.set(targetMember.id, true);
  targetMember==null&&promptingAll.set(channel.id, true);
  return new Promise( async (res,rej) => {
    const startFilter = (m) => {
      if(m.author.bot) return false;
      if((new RegExp(`${_.escapeRegExp(prefix)}chess (join|decline)`,'gi')).test(m.content.toLowerCase().replace(/\s+/g,'')))
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

module.exports = ex;
