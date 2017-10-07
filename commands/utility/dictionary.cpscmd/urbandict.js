
const urban = require('urban');

module.exports = {
  name:'urban',
  async func(msg, { reply, guild, member, content, prefix, Discord, client }) {
    let query = content.substring(`${prefix}urban `.length);
    let nsfw = false;
    if(~content.indexOf('--allownsfw')){
      nsfw = true;
      query = query.replace('--allownsfw','').split(/\s+/).join(' ');
    }
    console.log('[Urban] Allowing nsfw results? '+nsfw);

    let somensfwdetected = false;
    const results = urban(query);
    results._end( (json) => {
      let defs = json.list;
      console.log('[Urban] Creating embed...');
      let embed = new Discord.RichEmbed().setColor(guild?member.displayColor:42069);
      if(defs.length>0) for(let i = 0; i < Math.min(defs.length,5); i++){
        console.log('[Urban] Looping results... '+i);
        let entry = defs[i];
        let word = entry.word;
        let link = entry.permalink;
        if(!nsfw){
          console.log('[Urban] Now looping through definition');
          let words = entry.definition.split(/\s+/);
          for(const word of words) {
            if(~client.swearlist.indexOf(word)){
              somensfwdetected=true;
              console.log('[Urban] We detected nsfw, the value of somensfwdetected should be true and it is: '+somensfwdetected);

              entry.definition = '[Censored]';
              break;
            }
          }
        }
        console.log('[Urban] Checking definition length..');
        if(entry.definition.length>100) entry.definition = entry.definition.substring(0,100)+' ...';

        console.log('[Urban] Now adding to embed. ');
        embed.addField(`Entry #${i+1}: ${word.length>40?word.substring(0,40)+' ...':word}`, `Definition: ${entry.definition}
link: [click](${link})`);
      }else embed.addField('No results found','.');
      console.log('[Urban] Sending results...');
      return reply(`Urban dictionary results. ${somensfwdetected?'Some Nsfw content was censored out, add ``--allownsfw`` somewhere in your command to uncensor them.':''}`, { embed });

    });
  }
};
