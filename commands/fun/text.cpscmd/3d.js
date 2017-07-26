const cb= '```';
const asciify = require('asciify');

const asciiCooldown = new Map();
const COOLDOWN = 60*1000;

module.exports = {
  name:'3d',
  async func(msg, { send, prefix, content, guild }) {
    if(content.substring(`${prefix}3d `.length).split(/\s+/).length<1)
      send ('You must provide at least one word to 3dtext!');
    else if(content.substring(`${prefix}3d `.length).split(/\s+/).length<=5)
      if(!asciiCooldown.get(guild.id)){
        asciiCooldown.set(guild.id, true);
        setTimeout(()=>asciiCooldown.set(guild.id, false), COOLDOWN);
        content.substring(`${prefix}3d `.length).split(/\s+/).forEach(word=> (word&&!word.match(/\s+/))&&asciify( word, {font: 'larry3d'}, (e,r)=>send(`${cb}${r.length<1900?r:word.length<1800?'too long to 3d text:\n'+word:'something too long'}${cb}`) ));
      }else
        send('Woah there this command has a 1 minute cooldown please wait before trying that again!');
    else
      send('Too many words to 3dtext!');
  }
};
