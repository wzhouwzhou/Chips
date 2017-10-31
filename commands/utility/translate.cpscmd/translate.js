const translate = require('google-translate-api');

const ex = {
  name: 'translate',
  async func(msg, { reply, Discord, args, member }) {
    let inputContent = args.join(' ');
    let targetlang, stuffToTranslate = inputContent;

    let toMatch = /(\s*?(?:target):?\s*(?:lang(?:uage)?:?(\s)?)?)/i.exec(inputContent);
    if (toMatch) {
      let langMatcher = toMatch[0];
      console.log(`[TRANSLATE] langMatcher: ${langMatcher}`);
      let langquery = inputContent.substring(inputContent.indexOf(langMatcher) + langMatcher.length);
      console.log(`[TRANSLATE] langquery: ${langquery}`);
      targetlang = langquery.split(/\s+/)[0];
      console.log(`[TRANSLATE] targetlang: ${targetlang}`);
      stuffToTranslate = inputContent.replace(langMatcher && targetlang ? langMatcher + targetlang : '', '');
      console.log(`[TRANSLATE] stuffToTranslate: ${stuffToTranslate}`);
    }
    translate(stuffToTranslate, { to: targetlang ? targetlang : 'en' }).then(res => {
      let bad = new Discord.MessageEmbed();
      bad.setTitle('Translation Results')
        .addField(`Input:\n${stuffToTranslate}`, `Translated (from ${res.from.language.iso}, to ${targetlang ? targetlang : 'en'}):\n${res.text}`)
        .setFooter(new Date().toUTCString())
        .setColor(member ? member.displayColor : 1);
      return reply('', { embed: bad });
    }).catch(err => {
      console.log(err);
      if (err.message.startsWith('The language ') && err.message.endsWith('is not supported')) return reply(err.message.replace(/@/g, '(at)'));
      return reply(`Uh oh! Something went wrong with the translation!\nError: \`${err.message}\`\nPlease contact someone who knows what this means`);
    });
  },
};

module.exports = ex;
