module.exports = {
  name: 'spooky',
  func(msg, { author, member, guild, content, prefix, Discord, send }) {
    let truecontent = content.substring(`${prefix}spooky `.length);
    let spookymsg = truecontent;
    let toMatch = /(\s*?(?:num(?:ber)?):?\s*((?:sp(?:ace)?)((?:s)?)?\s*:?(\s*))?)/i.exec(truecontent);
    let numSpaces = 1;
    if (toMatch) {
      let numMatcher = toMatch[0];
      // Console.log(`[SPOOKY] numMatcher: ${numMatcher}`);
      let numquery = truecontent.substring(truecontent.indexOf(numMatcher) + numMatcher.length);
      // Console.log(`[SPOOKY] numquery: ${numquery}`);
      numSpaces = numquery.split(/\s+/)[0];
      numSpaces = isNaN(numSpaces) ? 1 : parseInt(numSpaces);
      // Console.log(`[SPOOKY] numspaces: ${numSpaces}`);
      spookymsg = truecontent.replace(numMatcher && numSpaces ? numMatcher + numSpaces : '', '');
      spookymsg = spookymsg.length < 1 ? ' ' : spookymsg;
      // Console.log(`[SPOOKY] stuff to convert: ${spookymsg}`);
    }
    // Else console.log('[SPOOKY] No repeat number specified..using 1');
    let s = '';
    for (let i = 0; i < numSpaces; i++) s += ' ';
    let converted = spookymsg.split(/\s*/).join(s);
    let embed = new Discord.MessageEmbed();
    embed.setColor(guild ? member.displayColor : 15152469);
    embed.setAuthor(author.tag, author.displayAvatarURL({ format: 'png', size: 2048 }));
    embed.setDescription(converted);
    return send(embed);
  },
};
