const nlp = require('nlp_compromise');
const nlpSyllables = require('nlp-syllables');

nlp.plugin(nlpSyllables);

const firstF = require('../../../rewrite-all/src/deps/functions/firstF').default();
module.exports = {
  name:'haiku',
  async func(msg, { send, prefix, content }) {
    const syllables = _.flatten(nlp.term(content.substring(`${prefix}${this.name} `.length)).syllables());
    const first17 = firstF(syllables, 17);
    const str = firstF(first17,7).join('')+firstF(first17,5).join('')+firstF(first17,7).join('');
    send(str);
  }
};
