
const urban = require('urban');

module.exports = {
  name:'urban',
  async func(msg, { reply, guild, member, content, prefix, Discord }) {
    let query = content.substring(`${prefix}urban `.length);
    let nsfw = ~content.indexOf('--allownsfw');

    const results = urban(query);
    results._end( (json) => {
      let defs = json.list;
      let embed = new Discord.RichEmbed().setColor(guild?member.displayColor:42069);
      for(let i = 0; i < Math.min(defs.length,10); i++){
        let entry = defs[i];
        let word = entry.word;
        let definition = entry.definition;
        let link = entry.permalink;
        let nsfwdetected = false;
        if(!nsfw) for(const word of definition.split(/\s+/)) {
          nsfwdetected = ~require('../').swearlist.indexOf(word);
          if(nsfwdetected) break;
        }
        if(definition.length>100) definition = definition.substring(0,100)+' ...';

        embed.addField(`Entry #${1}: ${word.length>40?word.substring(0,40)+' ...':word}`, `Definition: ${definition}
        link: [click](${link})`);
      }

      return reply(`Urban dictionary results. ${nsfwdetected?'Nsfw content was censored out':''}`, { embed });

    });
  }
};
