const reasons = [
  'NSFW',
  'Language',
  'Commands',
  'Alts',
  'Spam',
  'Copypasta',
  'Zalgo',
  'Caps',
  'Flooding',
  'Harassing',
  'Insulting',
  'Disrespecting',
  'Trolling',
  'Drama',
  'Annoying',
  'Off-topic',
  'Advertising',
  'Impersonation',
  'Farming'
]

const reasonsembed = [
  'NSFW',
  'Language',
  'Commands',
  'Alts',
  'Spam',
  'Copypasta',
  'Zalgo',
  'Caps',
  'Flooding',
  'Harassing',
  'Insulting',
  'Disrespecting',
  'Trolling',
  'Drama',
  'Annoying',
  'Off-topic',
  'Advertising',
  'Impersonation',
  'Farming'
].join(', ');

module.exports = {
  name: 'report',
  async func(msg, { guild, send, args, member, Discord, content, author, suffix, channel, collector, reply }) {
    
    if(!member.roles.some(r=>["Staff Team", "Supervisor", "Server Member", "Trusted"].includes(r.name))) {
      return reply(`You are not allowed to use this command!`);
    
    }
    
    const reportreason = args[0];

    if (channel.id === '274260111415836675') { 
      //Main and Games
      return reply('No big commands here!');
    }
    
    if (channel.id === '274260111415836675') { 
      //Main and Games
      return reply('No big commands here!');
    }
    
    
    if (!guild.id === '274260111415836675') {
      //DD
      return;
    }

    if (!~'Language Commands Alts Spam Copypasta Zalgo Caps Flooding Harassing Insulting Disrespecting Trolling Drama Annoying Off-topic Advertising Impersonation Farming language commands alts spam copypasta zalgo caps flooding harassing insulting disrespecting trolling drama annoying off-topic advertising impersonation farming'.split(/\s+/).indexOf(args[0]) || !args[1]) {

    let reasonembed = new Discord.MessageEmbed()
      .setTitle('Help!')
      .addField('All valid reasons', `${reasonsembed}`, true)
      .addField('Comments', 'Tell more about your report: Mention the user, include his ID, what is he spamming, and so on.')
      .setColor(member.displayColor);
    await member.send(reasonembed);
    
  } 
  
  if (~'Language Commands Alts Spam Copypasta Zalgo Caps Flooding Harassing Insulting Disrespecting Trolling Drama Annoying Off-topic Advertising Impersonation Farming language commands alts spam copypasta zalgo caps flooding harassing insulting disrespecting trolling drama annoying off-topic advertising impersonation farming'.split(/\s+/).indexOf(args[0]) && args[1]) {

    const question = [`${author.tag}, are you sure that you want to report?`, 'Reply with __y__es or __n__o in 10 seconds.'];
    embed = new Discord.MessageEmbed()
      .setTitle('Report Verification')
      .addField(...question)
      .addField(`${'Reason: ' + reportreason}`, `${'Extra comments: ' + content.substring(content.indexOf(args[1]))}`)
      .setFooter(`Abusing this may result in a punishement.`)
      .setThumbnail(Constants.images.WARNING)
      .setColor(member.displayColor);
    await send(embed).then(sentmsg =>
      setTimeout(() => { sentmsg.delete(); }, 15000));
    
    let confirmed = false, agreed = false;
    collector = channel.createMessageCollector(m => {
      if (m.author.id === author.id && /^(?:y(?:es)?)|(?:no?)$/i.test(m.content)) {
        m.channel.send('Choice accepted, one moment...');
        confirmed = true;
        agreed = /^(?:y(?:es)?)$/i.test(m.content);
        setTimeout(() => collector.stop(), 500);
        return true;
      }
      return false;
    }, { time: 10000 });
    return collector.on('end', async collected => {
      if (!confirmed) {
        return reply('Report Verification timed out');
      } else {
        let m = collected.first();
        if (m.author.id !== author.id) return false;
        if (agreed) {
          report = new Discord.MessageEmbed()
            .setTitle('Report!')
            .addField(reportreason, content.substring(content.indexOf(args[1])))
            .setColor(member.displayColor)
          await guild.channels.get('322843543532208128').send(report);
          return send('Your report has succesfully been sent!');
        } else {
          return m.reply("Ok, I won't send your report!");
        }
    }
});
  }
}
}