'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const firstF = require('./firstF').default();
exports.default = ({ Discord }) => {
  const { Collection } = Discord;
  const fetchMessagesR = ( channel, options, collection = new Collection() ) => {
    const limit = options.limit;
    return new Promise( (res,rej) => {
      if(collection.size >= limit) return res(new Collection(firstF(Array.from(collection.values()),limit).map(e=>[e.id,e])));
      channel.fetchMessages(Object.assign({}, options, {limit: Math.min(options.limit,100)} )).then(async msgs=>{
        if(msgs.size == 0) return res(collection);
        Array.from(msgs.values()).forEach(m => collection.set(m.id, m));
        return res(await fetchMessagesR( channel, { limit, before: Array.from(msgs.values()).sort((a,b)=>a.createdAt-b.createdAt)[0].id }, collection));
      }).catch(rej);
    });
  };
  return fetchMessagesR;
};
