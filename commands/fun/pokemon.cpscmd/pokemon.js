const cb = '```';

const STARTMSG = 'Type __{prefix}start__ to begin playing or __stop__ or __cancel__ to cancel!';
const STARTCONFIRM = '{prefix}start';
const CANCEL = 'cancel';
const STOP = 'stop';

const INPUTEXPIRE = 15000;
const STARTWAIT = 60000;

const GAMECANCEL = 'Pokemon game cancelled! To start another one do {prefix}pokemon!';

const BOOT = 'System booting up';
const BOOTLOOP = 3;
const BOOTWAIT = 1500;

const SYSREADY = 'System is ready!';

const ACTIONSEMBRXN = new Discord.RichEmbed().setTitle('Choose an action!');
[
  '{one}|Fite'.replace('{one}',Constants.CHOICES[1]).split(/\|/),
  '{two}|Bag'.replace('{two}',Constants.CHOICES[2]).split(/\|/),
  '{three}|Pokement'.replace('{three}',Constants.CHOICES[3]).split(/\|/),
].forEach(f=>ACTIONSEMBRXN.addField(f[0],`${cb}${f[1]}${cb}`, true));

const ACTIONCHOICESTEXT = [
  '**__Fite__**',
  '**__Bag__**',
  '**__Pokement__**',
].join('\n');

const ACTIONSEMBTEXT = new Discord.RichEmbed().setTitle('Choose an action!').setDescription(ACTIONCHOICESTEXT);

module.exports = {
  name: "pokemon",
  async func(msg, ctx) {
    let { reply } = ctx;

    let rxn = await rxnInputPrompt(msg, ctx);
    if(!rxn) return reply('Sorry, text based input is currently not available');
    else await playGameRXN(msg, ctx);
  }
};

const rxnInputPrompt = (msg, { reply, author, channel }) => {
  return new Promise ( res => {
    reply('Would you like to play by using message reactions (fancy) or just typing (good for mobile)? React or type __y__es or __n__o').then(async sentmsg => {
      let mCol, confirmed = false;

      let rC = sentmsg.createReactionCollector(
        (r, u) => {
          if(u.id != author.id) return false;
          if(!confirmed)
            if(r.emoji.toString() == Constants.emojis.CHECK){
              confirmed = true;
              mCol.stop();
              res(true);
              return true;
            }else if(r.emoji.toString() == Constants.emojis.X){
              confirmed = true;
              mCol.stop();
              res(false);
              return true;
            }

          return false;
      },
      { max: 1, time: INPUTEXPIRE, errors: ['time'] } );

      mCol = channel.createMessageCollector(
        query => { if(query.content) if(/^(?:y(?:es)?)|(?:no?)$/i.test(query.content))
          if(!confirmed&&query.author.id==author.id){
            confirmed = true;
            rC.stop();
            res(/^(?:y(?:es)?)$/i.test(query.content));
            return true;
          }
          return false;
        },
        { max: 1, time: INPUTEXPIRE, errors: ['time'] }
      );

      mCol.on('end', collected => {
        if(!confirmed){
          console.log(collected.first().name);
          reply('No input was given so we are going with reaction controls!');
          res(true);
        }
      });
      await sentmsg.react(`${Constants.emojis.CHECK}`);
      await sentmsg.react(`${Constants.emojis.X}`);

    });
  });
};

const playGameRXN = async (msg, { reply, prefix, author, channel, delay }) => {
  let beginmsg = await reply(STARTMSG.replace('{prefix}',prefix));
  let startInit = false;

  const startFilter = (m) => {
    if(m.author.id != author.id) return false;
    if(m.content.toLowerCase() == STARTCONFIRM.replace('{prefix}',prefix).toLowerCase()){
      startInit = true;
      return true;
    }else if (m.content.toLowerCase() == CANCEL || m.content.toLowerCase() == STOP ) return true;
    return false;
  };
  let startCol;
  try{
    startCol = await channel.awaitMessages(startFilter, { max: 1, time: STARTWAIT, errors: ['time'] });
  }catch(startCCollected){
    return reply(GAMECANCEL.replace('{prefix}',prefix));
  }
  let agreedmsg = startCol.first();
  await beginmsg.delete();

  if(!startInit) return reply(GAMECANCEL.replace('{prefix}',prefix));

  let initialisationMsg = await agreedmsg.reply(BOOT);
  for(let i = 0; i<BOOTLOOP; i++){
    await initialisationMsg.edit(initialisationMsg.content+'.');
    await delay(BOOTWAIT);
  }

  await initialisationMsg.edit(SYSREADY);

  let choiceChooser = await msg.reply('', { embed: ACTIONSEMBRXN });

  for(let i = 1; i <= 3; i++)
    await choiceChooser.react(Constants.CHOICES[i]);
};
