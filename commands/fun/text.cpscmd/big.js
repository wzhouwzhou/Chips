
const snekfetch = require('snekfetch');
const twe = require('twemoji');
const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: "big",
  async func( msg,
  {
    send,
    reply,
    prefix,
  } ) {
    if(msg.content.replace(new RegExp(`${prefix}big\\s*`),'').length != 0) {
      let str = msg.content.match(/<:[\w0-9_]+:\d+>/g);
      if(str&&str[0]) {
        if(str.length>1){
          const emojis = [];
          str.forEach(e=>{
            let id = e.substring(1+e.lastIndexOf(':'),e.length-1);
            emojis.push(`https://cdn.discordapp.com/emojis/${id}.png`);
          });
          const p = new P ( msg,  {
            type:'paged',
            embedding: true,
            image: emojis,
            }, Discord
          );
          if(emojis.length>0)
            return p.sendFirst();
          return reply('No emoji images found');
        }
        let id = str[0].substring(1+str[0].lastIndexOf(':'),str[0].length-1);
        let fetched= await snekfetch.get(`https://cdn.discordapp.com/emojis/${id}.png`);
        if(fetched&&fetched.body)
          return send(' ',{files: [{attachment: fetched.body}]});
        return reply('No emoji image found');
      } else {
        let str = msg.content;
        if(str&&str[0]){
          let parsed = twe.parse(str).toString().match(/src="([\w|\d|:|\/|.]+")/);
          if(parsed&&parsed[0]){
            let url = parsed[0].substring('src="'.length, parsed[0].length-1);
            let fetched;
            if(url)
              fetched= await snekfetch.get(url);
            if(!fetched||!fetched.body)
              return reply('No emoji image found');
            return send(' ',{files: [{attachment: fetched.body}]});
          }
          return reply('No emoji image found');
        }
      }
    return reply('No emoji was given');
    }
  return reply('No emoji given');
  }
};
