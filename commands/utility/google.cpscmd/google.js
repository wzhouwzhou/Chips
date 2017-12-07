const request = require('request');
const honeynut = require('cheerio');

module.exports = {
  name: 'google',
  async func(msg, { send, args, author, Discord, member }) {
    if (!args[0]) return send('You must enter something to search for!');
    request.get('http://google.com/search?client=chrome&rls=en&ie=UTF-8&oe=UTF-8&q=' + args.join('+'), (err, res, body) => {
    if (!err && res.statusCode === 200) {
    let $$ = honeynut.load(body);
    let brackets = [];
    $$('.g').each((i) => {
      brackets[i] = {};
    });
    $$('.g>.r>a').each((i, e) => {
      let raw = e.attribs['href'];
      brackets[i]['link'] = raw.substr(7, raw.indexOf('&sa=U') - 7);
    });
    $$('.g>.s>.st').each((i, e) => {
      brackets[i]['description'] = getSearchResults(e);
    });

    let ebrackets = brackets.filter(r => r.link && r.description);
    ebrackets = ebrackets.splice(0, 3);
                
    if(ebrackets=="") return send("Oh no! You input an invalid search request!");  
    else { 
      let embed = new Discord.MessageEmbed()
        .setColor(member ? member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`)
        .setTitle(``)
        .setDescription(``)
        .addField('Search results for  `' + `${args.join(' ')}` + '`', ebrackets.map(r => r.link + '\n\t' + r.description + '\n').join('\n'))
        .setFooter(`Requested by ${author.tag}`);
      send(embed);
    }}});
  }
};

function getSearchResults(children) {
  if (children.children) return getSearchResults(children.children);
  return children.map(c => {
  return c.children ? getSearchResults(c.children) : c.data;
  }).join('');
};
