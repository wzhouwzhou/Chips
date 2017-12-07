const exec = require('../../../rewrite-all/src/deps/functions/execF').default({ _, child_process: require('child_process') });

const whitelist = [
  Constants.users.WILLYZ,
  Constants.users.PGSUPER,
  Constants.users.EVILDEATHPRO,
  Constants.users.LUCAS,
  '302252773427249163',
];

module.exports = {
  name: 'git',
  async func(msg, { send, author, args, Discord }) {
    if (whitelist.indexOf(author.id) < 0) return console.log(`Prohibited access to git to user ${author.id}`);
    let result = null;
    if (~'p pull pool puel pael'.split(/\s+/).indexOf(args[0])) {
      result = await exec('git pull');
      await send(new Discord.MessageEmbed().setDescription(result.substring(0, 1800)));
    }
    if (result && !~result.toLowerCase().replace(/(\s|-)+/g, '').indexOf('uptodate')) process.exit(42);
  },
};
