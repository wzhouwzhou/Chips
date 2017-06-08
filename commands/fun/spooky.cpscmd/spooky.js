
module.exports = {
  name: "spooky",
  perm: ["server.spooky"],
  customperm: ['SEND_MESSAGES'],
  async func(msg, { author, member, guild, content, prefix, Discord, reply }) {
    let truecontent = content.substring((prefix+`spooky `).length);
    let spookymsg = truecontent;
    let toMatch = /(\s*?(?:num(?:ber)?):?\s*((?:rep(?:eat)?)((?:s)?)?\s*:?(\s*))?)/i.exec(truecontent);
    let numSpaces = 1;
    if(toMatch){
      let numMatcher = toMatch[0];
      console.log('[SPOOKY] numMatcher: '+ numMatcher);
      let numquery = truecontent.substring(truecontent.indexOf(langMatcher)+langMatcher.length);
      console.log('[SPOOKY] numquery: '+ numquery);
      numSpaces = (langquery.split(/\s+/)[0]);
      numSpaces = isNaN(numSpaces)?1:parseInt(numSpaces);
      console.log('[SPOOKY] numspaces: '+ numSpaces);
      spookymsg = truecontent.replace(langMatcher&&targetlang?langMatcher+targetlang:'','');
      spookymsg = spookymsg.length<1?' ':spookymsg;
      console.log('[SPOOKY] stuff to convert: '+ spookymsg);
    }else console.log('[SPOOKY] No repeat number specified..using 1');
    let s='';
    for(let i=0;i<numSpaces;i++) s+=' ';
    let converted = spookymsg.split(/\s*/).join(s);
    let bad = new Discord.RichEmbed();
    bad.setTitle('Spooky!').setColor(guild?member.displayColor:15152469);
    bad.setAuthor(author.tag, author.displayAvatarURL.replace(/\.webp/,`.png`)).setFooter(new Date().toUTCString());
    bad.setDescription(converted);
    return reply(' ',{embed: bad});
  }
};
