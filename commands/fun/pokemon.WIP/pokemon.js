
const STARTMSG = 'Type __{prefix}start__ to begin playing or __stop__ or __cancel__ to cancel!';
const STARTCONFIRM = '{prefix}start';
const CANCEL = 'cancel';
const STOP = 'stop';
const STARTWAIT = 60000;

const GAMECANCEL = 'Pokemon game cancelled! To start another one do {prefix}pokemon!';

const BOOT = 'System booting up.';
const BOOTLOOP = 3;
const BOOTWAIT = 1250;

module.exports = {
  name: "pokemon",
  async func(msg, { reply, prefix, author, channel, delay }) {

    let beginmsg = await reply (STARTMSG.replace('{prefix}',prefix));
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
      await delay(BOOTWAIT);
      await initialisationMsg.edit(initialisationMsg.content+'.');
    }

    await initialisationMsg.delete();

  }
};
