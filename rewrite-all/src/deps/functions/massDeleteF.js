'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('../../struct/client/Logger').create('exports','massDeleteF');

exports.default = ({Discord, _}) => {
  const fmr = require('./fetchMessagesRF').default({Discord, _});
  const first = require('./firstF').default({_});
  const chunk =  require('./splitChunkF.js').default({_});
  const massDelete = (channel, options) =>
    new Promise( async (res,rej) =>{
      try{
        const chunks = chunk(await fmr(msg.channel, { limit: options.limit||100 }));
        first(chunks, chunks.length>2?chunks.length-2:0).forEach(e=>channel.bulkDelete(e,!0).catch(err=>{ throw new Error(err); }));
        if(chunks[chunks.length-1].size == 1) chunks[chunks.length-1].delete().catch(err=>{ throw new Error(err); });
        else channel.bulkDelete(chunks[chunks.length-1],!0).catch(err=>{ throw new Error(err); });
      }catch(err){
        Logger.error(err);
        rej(err);
      }
    })
  ;

  return massDelete;
};
