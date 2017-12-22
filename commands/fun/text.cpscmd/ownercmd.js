const fish = [
  ':fishing_pole_and_fish:',
  '**LucasLSG, you caught: :battery:!** You paid :yen: **10** for casting.',
].join(' ');

module.exports = {
  name: 'ownercmd',
  func(msg, { send, args, member, Discord }) {
    if (args[0].match(/start/)) {
      msg.delete().catch(_ => _);
    }

    if (args[0].match(/fish|fishy/)) {
      send(new Discord.MessageEmbed()
        .setDescription(fish)
        .setColor(member.displayColor));
    }
 send(template)
    }
  },
};

/*       Channel.startTyping();
      msg.delete().catch(_ => _);
      send(suffix);
      channel.stopTyping();

        [
    "{{first}} grabs a candy cane and uses {{second}}'s confusion to grab the knife hidden in the cane.",
    "as {{first}} is slowly cutting {{second}}'s stomach open and filling it with all kinds of chocolate-santas",
    'that once were chocolate easter bunnys, {{second}} is screaming in pain trying to stop {{first}},',
    'but is unable to move properly due to the pain.'].join(' '),

          reply(`Could not delete ${nummsgs} bot-related messages, perhaps I am missing permissions?`).then(sentmsg =>
        setTimeout(() => { sentmsg.delete(); }, 5000));*/
