
module.exports = {
    name: "setchannel",
    async func(msg, { send, guild, args, member, channel, suffix, prefix }) {

      if(!guild)
        return send('You must be in a server to use this');

      if (!args[0])
        return send(new Discord.MessageEmbed()
          .setTitle('How to use setchannel')
          .setDescription([
            '{}<name> name [new-name] - sets the channel name.',
            '{}<name> topic [new topic] - sets the channel topic.',
            '{}<name> position [new position] - sets the channel position.'
          ].map(e=>e.replace(/^(\{\})\s*(<name>)\s+(\w+)\s*(\[[\w\s-_]+\])?\s*-\s*([^]*)$/gi, (e,pre,nm,item,args,suff) => `**${_.escapeRegExp(prefix||'-')}${this.name||'setchannel'} ${item} ${args||''}** ${suff}`)).join('\n'))
          .setColor(member.displayColor));

      if (args[0]==='name')
        if(!args[1])
          return send('No name given to set');
        else if(!suffix.substring(suffix.indexOf(args[1])).match(/^[0-9a-z\-_]+$/i))
          return send('Text channel name must be alphanumeric with dashes or underscores.');
        else {
          await channel.setName(suffix.substring(suffix.indexOf(args[1])));
          return send(`Channel name set to ${_.escapeRegExp(channel.name).replace(/@/g,'(at)')} successfully`);
        }
      
      if (args[0]==='position')
        if(!args[1]) 
          return send('No position given.') 
        else if(!suffix.substring(suffix.indexOf(args[1])).match(/\d+/g)) 
          return send('No number given') 
        else {
          await channel.setPosition(suffix.substring(suffix.indexOf(args[1])));
          return send(`Channel position set to ${_.escapeRegExp(chanel.position).replace(/@/g, '(at)')} succesfully`)
        }

      if (args[0]==='topic')
        if(!args[1])
          return send('No topic given to set');
        else {
          await channel.setTopic(suffix.substring(suffix.indexOf(args[1])));
          return send(`Channel topic set to ${_.escapeRegExp(channel.topic).replace(/@/g,'(at)')} successfully`);
        }
    }
};
