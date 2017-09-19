const nlp = require('nlp_compromise');
const nlpSyllables = require('nlp-syllables');

nlp.plugin(nlpSyllables);

const firstF = require('../../../rewrite-all/src/deps/functions/firstF').default({_});
const lastF  = require('../../../rewrite-all/src/deps/functions/lastF' ).default({_});

module.exports = {
  name:'haiku',
  async func(msg, { send, prefix, content, args }) {
    if(!args[0]) return send('Nothing to generate a haiku from');
    const sentence = content.substring(`${prefix}${this.name} `.length);
    const syllables = _.flatten(nlp.term(sentence).syllables());
    if(syllables.length<17) return send('Not enough text to create a haiku from');
    const first17 = firstF(syllables, 17);

    let str = `${firstF(first17,5).join('')}\n${lastF(firstF(first17,5+7),7).join('')}\n${lastF(firstF(first17,5+7+5),5).join('')}`;
    const regs = sentence.split(/\s+/).map(e=>new RegExp(`${_.escapeRegExp(e)}`,'gi'));
    regs.forEach(e=>str=str.replace(e, s=>s+' '));
    send(str);
  }
};
