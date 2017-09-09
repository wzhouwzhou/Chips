'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const grammarJoin = require('./grammarJoinF').default();
const EXPIRE = 5*60*10e3;
const genDefaultP = ({ deniedMsgs, deniedRxns, acceptedMsgs, acceptedRxns, _ }) => {
  let defaultPrompt = 'Please ', someAccept = false, someDeny = false;
  if(acceptedMsgs&&acceptedMsgs.length>0) {
    defaultPrompt+=`type __${_.escapeRegExp(grammarJoin(acceptedMsgs.map(e=>e.trim())))}__`;
    someAccept = true;
  }
  if(acceptedRxns&&acceptedRxns.length>0) {
    if(defaultPrompt.match(/^Please type[^]+/i))
      defaultPrompt += ' or ';
    defaultPrompt+=`react with __${_.escapeRegExp(grammarJoin(acceptedRxns.map(e=>e.trim())))}__`;
    someAccept = true;
  }
  if(someAccept)
    defaultPrompt+=' to **accept/continue**.\nPlease ';

  if(deniedMsgs&&deniedMsgs.length>0) {
    defaultPrompt+=`type __${_.escapeRegExp(grammarJoin(deniedMsgs.map(e=>e.trim())))}__`;
    someDeny = true;
  }
  if(deniedRxns&&deniedRxns.length>0) {
    if(someAccept||someDeny)
      defaultPrompt += ' or ';
    defaultPrompt+=`react with __${_.escapeRegExp(grammarJoin(deniedRxns.map(e=>e.trim())))}__`;
    someDeny = true;
  }

  if(someDeny)
    defaultPrompt+=' to **reject/stop**';
  defaultPrompt+='.';
  return defaultPrompt;
};

exports.default = ({_}) =>
  // options must contain mfilter and rfilter,
  // a users object that either has an allowAll = true or array of userids
  // accepted/deniedMsgs and accepted/deniedRxns
  // expire (time in ms)
  // reply (boolean whether to reply in prompt)
  (msg, { options }) => {
    const channel = msg.channel;
    const { users, promptMsg, expire, numMsgs, acceptedMsgs, deniedMsgs, acceptedRxns, deniedRxns } = options;
    if(!(deniedMsgs||deniedRxns||acceptedMsgs||acceptedRxns)) throw new Error('No choices to validate');

    const allMsgs = [...acceptedMsgs, ...deniedMsgs];
    const allRxns = [...acceptedRxns, ...deniedRxns];
    return new Promise( async (res, rej) => {
      let externalMsgCounter = 0;
      const mcol = channel.createMessageCollector(
        m=>{
          if(users.allowAll) return true;
          if(users.indexOf(m.author.id)){
            if((~allMsgs.indexOf(m.content))||(options.mfilter&&options.mfilter(m))) {
              externalMsgCounter++;

            }
            if(externalMsgCounter>numMsgs) mcol.stop();
          }
          return false;
        },
        { maxMatches: numMsgs || 1, time: expire||EXPIRE }
      );

      mcol.on('end', collected => {
        if(collected.size === 0) return rej('timeout');
        res(collected);
      });
      const defaultPrompt = genDefaultP({ deniedMsgs, deniedRxns, acceptedMsgs, acceptedRxns, _ });

      const sentmsg = options.reply?await msg.reply(promptMsg||defaultPrompt):await msg.channel.send(promptMsg||defaultPrompt);
      sentmsg.createReactionCollector(
        (reaction, user) => {
          if(!users.allowAll&&!users.indexOf(user.id)) return false;

          if(user.id != author.id) return false;
          if(temp.confirmed||!temp.next) return false;
          if(!~allRxns.indexOf(reaction.emoji.toString())) return false;

            reply("Accepted choice " + reaction.emoji.name);
            temp.confirmed=true;
            temp.next=false;
            temp.rxn = true;
            return true;

        },{ max: numRxns || 1, time: expire||EXPIRE }
      );
    });
  }
;
