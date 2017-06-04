const translate = require('google-translate-api');


const ex = {
  name: "translate",
  perm: ["global.info","global.info.all","global.info.serv","global.info.channel","global.info.role","global.info.user","global.info.user.self"],
  customperm: ['SEND_MESSAGES'],
  async func(msg, {reply, Discord, args }) {
    let inputContent = args.join(' ');
    translate(inputContent, {to: 'en'}).then(res => {
      let bad = new Discord.RichEmbed();
      bad.setTitle("Translation Results")
         .addField(`Input:\n${inputContent}`,`Translated:\n${res.text}`)
         .setFooter(new Date().toUTCString());
      /*  console.log(res.text);
        //=> I speak English
        console.log(res.from.language.iso);
        //=> nl*/
      return reply('',{embed: bad});
    }).catch(err => {
      console.log(err);
      return reply('Uh oh! Something went wrong with the translation!');
    });
  }
};

module.exports= ex;
