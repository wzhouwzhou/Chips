const exec = require ('../../../rewrite-all/src/deps/functions/execF').default({_, child_process: require('child_process')});

const whitelist = [
  Constants.users.WILLYZ,
  Constants.users.XZLQ,
  Constants.users.PGSUPER,
  Constants.users.EVILDEATHPRO,
  '302252773427249163',
  '205608598233939970',
];

module.exports = {
  name:'git',
  async func(msg, { send, author, args }) {
    if (whitelist.indexOf(author.id) < 0) return console.log("Prohibited access to git to user " + author.id);
    let result = null;
    if(args[0] === 'pull') {
      result = await exec('git pull');
      await send(new Discord.RichEmbed().setDescription(result.substring(0,1800)));
    }
    if(result&&!~result.toLowerCase().replace(/(\s|-)+/g,'').indexOf('uptodate'))
      process.exit(42);
  }
};
