const exec = require('../../../rewrite-all/src/deps/functions/execF')
  .default({ _: require('lodash'), child_process: require('child_process') });

let whitelist;

module.exports = {
  name: 'git',
  async func(msg, { send, author, args, member, Discord, Constants }) {
    if (!whitelist) {
      whitelist = [
        Constants.users.WILLYZ,
        Constants.users.PGSUPER,
        Constants.users.EVILDEATHPRO,
        Constants.users.LUCAS,
        '302252773427249163',
        '286246724270555136',
        '409776199297007617',
      ];
    }
    if (whitelist.indexOf(author.id) < 0) return true;
    // Console.log(`Prohibited access to git to user ${author.id}`);
    let result = null;
    if (~'p pull pool puel pael peul pol pu pul pol pae gud gud pae pu pul'.split(/\s+/).indexOf(args[0])) {
      result = await exec('git pull');
      await send(new Discord.MessageEmbed().setColor(member ? member.displayColor : 0x1213EE).setDescription(result.substring(0, 1800)));
    }
    if (result && !~result.toLowerCase().replace(/(\s|-)+/g, '').indexOf('uptodate')) return process.exit(42);
    return true;
  },
};
