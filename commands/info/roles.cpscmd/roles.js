const _ = require('lodash');
const chunk = require('../../../rewrite-all/src/deps/functions/splitChunkF').default({_});
const { Paginator } = require('../../../rewrite-all/src/struct/client/Paginator');

module.exports = {
  name: 'roles',
  async func(msg, { send, guild, member, args, Discord }) {
    if(!guild)
      return send('You must be in a server to use this!');
    if(args[0]&&args[0].toLowerCase()==='all')
      return send(new Discord.MessageEmbed().setColor(member.displayColor).setTitle(`Role List (${guild.roles.size})`).setDescription(guild._sortedRoles().map(e=>_.escapeRegExp(e.name)).reverse().join(', ')));

    let roles = chunk(guild.roles, {chunksize: 10});

    const p = new Paginator ( msg,  {
      type:'paged',
      embedding: true,
      fielding: false,
      title: 'Role List',
      text: `Type __${_.escapeRegExp(prefix)}${this.name} all__  to see the whole list`,
      pages:
      [
        ...roles.map((r,p)=>[`Roles (p${p+1})`, r.map(e => `**${guild.roles.map(r => r.id).indexOf(e.id)+1}.** ${e.name}`).join('\n')])
      ],
      }, Discord
    );
    try{
      await p.sendFirst();
    }catch(err){
      console.error(err);
      inmention.set(author.id, false);
      return send ('Something went wrong...');
    }
  }
};
