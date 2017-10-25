const _ = require('lodash');
const firstF = require('../../../rewrite-all/src/deps/functions/firstF').default({_});
const splitChunkF = require('../../../rewrite-all/src/deps/functions/splitChunkF').default({_});
const { Paginator } = require('../../../rewrite-all/src/struct/client/Paginator');

module.exports = {
  name: "botguilds",
  async func(msg, { client, Discord, send }) {
    const results = await client.shard.broadcastEval('Array.from(client.guilds.values()).sort((a,b)=>b.members.size-a.members.size).map(g=>[g.name, g.members.size])');
    let total = results.reduce((a,b)=>[...a,...b],[]);
    total = splitChunkF(firstF(total, 100).map(e=>`__${_.escapeRegExp(e[0])}__ (${e[1]} members)`), {size: 10});

    const p = new Paginator (msg, {
      type:'paged',
      embedding: true,
      fielding: false,
      text: 'Top 100 largest servers I am in!',
      pages: total,
      lockToggle: true,
      }, Discord
    );
    try{
      await p.sendFirst();
    }catch(err){
      console.error(err);
      return send ('Something went wrong...');
    }
  }
};
