'use strict';
Object.defineProperty(exports, "__esModule", { value: true });

const firstF = require('./firstF').default();
exports.default = ({ Discord }) => {
  const { Collection } = Discord.Collection;
  return ( channel, options, collection = new Collection() ) => {
    const limit = options.limit;
    return new Promise( (res,rej) => {
      if(collection.size >= limit) return res(new Collection(firstF(collection.array(),limit).map(e=>[e.id,e])));
  channel.fetchMessages(Object.assign({}, options, {limit: Math.min(options.limit,100)} )).then(async msgs=>{
        if(msgs.size == 0) return res(collection);
        msgs.array().forEach(m=> collection.set(m.id, m));
        if(collection.size >= limit) return res(new Collection(firstF(collection.array(),limit).map(e=>[e.id,e])));
        return res(await fetchMessagesR( channel, { limit, before: msgs.array().sort((a,b)=>a.createdAt-b.createdAt)[0].id }, collection));
      }).catch(rej);
    });
  };
};
