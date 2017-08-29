'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const grammarJoin = require('./grammarJoinF').default();

exports.default = ({_}) => {
  // options must contain mfilter and rfilter,
  // a users object that either has an allowAll = true or array of userids
  // accepted/deniedMsgs and accepted/deniedRxns
  // expire (time in ms)
  // reply (boolean whether to reply in prompt)
  const collectAll = (msg, { options }) => {
    const channel = msg.channel;
    const { users, promptMsg, expire, numMsgs, acceptedMsgs, deniedMsgs, acceptedRxns, deniedRxns } = options;
    if(!(deniedMsgs||deniedRxns||acceptedMsgs||acceptedRxns)) throw new Error('No choices to validate');

    const allMsgs = [...acceptedMsgs, ...deniedMsgs];
    return new Promise( (res, rej) => {
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
        { maxMatches: numMsgs || 1, time: expire }
      );

      mcol.on('end', collected => {
        if(collected.size === 0) return rej('timeout');
        res(collected);
      });

      let defaultPrompt = 'Please ', someAccept = false, someDeny = false;
      if(acceptedMsgs&&acceptedMsgs.length>0) {
        defaultPrompt+=`type __${_.escapeRegExp(grammarJoin(acceptedMsgs))}__`;
        someAccept = true;
      }
      if(acceptedRxns&&acceptedRxns.length>0) {
        if(defaultPrompt.match(/^Please type[^]+/))
          defaultPrompt += 'or ';
        defaultPrompt+=`react with ${_.escapeRegExp(grammarJoin(acceptedMsgs))}`;
        someAccept = true;
      }
      if(someAccept)
        defaultPrompt+=' to accept/continue, or ';

      if(deniedMsgs&&deniedMsgs.length>0) {
        defaultPrompt+=`type __${_.escapeRegExp(grammarJoin(deniedMsgs))}__`;
        someDeny = true;
      }
      if(deniedRxns&&deniedRxns.length>0) {
        if(defaultPrompt.match(/^Please type[^]+/))
          defaultPrompt += 'or ';
        defaultPrompt+=`react with ${_.escapeRegExp(grammarJoin(deniedMsgs))}`;
        someDeny = true;
      }

      if(someDeny)
        defaultPrompt+=' to reject/stop, or ';


      if(options.reply) msg.reply(promptMsg||defaultPrompt);
      else msg.channel.send(promptMsg||defaultPrompt);
    });
  };
  return collectAll;
};
