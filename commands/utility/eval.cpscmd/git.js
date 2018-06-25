const exec = require('../../../rewrite-all/src/deps/functions/execF')
  .default({ _: require('lodash'), child_process: require('child_process') });

module.exports = {
  name: 'git',
  async func(msg, { send, suffix, args, member, Discord }) {
    let result = null;
    if ('p pull pool puel pael peul pol pu pul pol pae gud gud pae pu pul poo pie pae pe pu pa ping good gud'
      .split(/\s+/).includes(args[0])) {
      result = await exec('git pull');
      await send(new Discord.MessageEmbed().setColor(member ? member.displayColor : 0x1213EE).setDescription(result.substring(0, 1800)));
      if (result && !result.toLowerCase().replace(/(\s|-)+/g, '').includes('uptodate')) return process.exit(42);
    } else {
      result = await exec(`git ${suffix}`);
      await send(new Discord.MessageEmbed().setColor(member ? member.displayColor : 0x1213EE).setDescription(result.substring(0, 1800)));
    }
    return true;
  },
};
