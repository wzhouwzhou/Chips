const translate = require('google-translate-api');


const ex = {
  name: "translate",
  perm: ["global.info","global.info.all","global.info.serv","global.info.channel","global.info.role","global.info.user","global.info.user.self"],
  customperm: ['SEND_MESSAGES'],
  async func(msg, {reply, Discord, args }) {
    let inputContent = args.join(' ');

    let langMatcher = /(?:target:?\s*(?:lang(?:uage):?(\s)?)?)/i.exec(inputContent)[0];
    console.log('[TRANSLATE] langMatcher: '+ langMatcher);
    let langquery = inputContent.substring(inputContent.indexOf(langMatcher)+langMatcher.length);
    console.log('[TRANSLATE] langquery: '+ langquery);
    let targetlang = langquery.split(/\s+/)[0];
    console.log('[TRANSLATE] targetlang: '+ targetlang);
    let stuffToTranslate = inputContent.replace(langMatcher&&targetlang?langMatcher+targetlang:'','');
    console.log('[TRANSLATE] stuffToTranslate: '+stuffToTranslate);
    translate(stuffToTranslate, {to: targetlang?targetlang:'en'}).then(res => {
      let bad = new Discord.RichEmbed();
      bad.setTitle("Translation Results")
         .addField(`Input:\n${inputContent}`,`Translated (from ${res.from.language.iso}):\n${res.text}`)
         .setFooter(new Date().toUTCString());
      return reply('',{embed: bad});
    }).catch(err => {
      console.log(err);
      return reply('Uh oh! Something went wrong with the translation!');
    });
  }
};

module.exports= ex;
