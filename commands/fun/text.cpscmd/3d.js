const cb= '```';
const asciify = require('asciify');

module.exports = {
  name:'3d',
  async func(msg, { send, prefix, content }) {
    return content.substring(`${prefix}3d `.length).split(/\s+/).length<=5?content.substring(`${prefix}3d `.length).split(/\s+/).forEach(word=> (word&&!word.match(/\s+/))&&asciify( word, {font: 'larry3d'}, (e,r)=>send(`${cb}${r.length<1900?r:word.length<1800?'too long to 3d text:\n'+word:'something too long'}${cb}`) )):send('Too many words to 3dtext!');
  }
};
