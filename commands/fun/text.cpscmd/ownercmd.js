module.exports = {
  name: 'ownercmd',
  func(msg, { send, channel, args, member, Discord }) {
    if (args[0].match(/start/)) {
      msg.delete().catch(_ => _);
      channel.startTyping();
    } if (args[0].match(/fish|fishy/)) {
      send(new Discord.MessageEmbed()
        .setDescription(':fishing_pole_and_fish:',
          '**LucasLSG, you caught: :battery:!** You paid :yen: **10** for casting.')
        .setColor(member.displayColor));
    }
  },
};

/*       Channel.startTyping();
      msg.delete().catch(_ => _);
      send(suffix);
      channel.stopTyping(); */
