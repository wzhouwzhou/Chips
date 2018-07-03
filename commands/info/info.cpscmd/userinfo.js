const path = require('path');
const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;
const snekfetch = require('snekfetch');

exports.name = 'userinfo';
exports.func = async(msg, ctx) => {
  const { send, Constants, member, guild, args, client, suffix, author, Discord } = ctx;
  let target = member, multiple = false;

  if (args[0]) {
    target = await get_id(args[0], guild || client);
    if (!target) target = await get_mention(args[0], Constants.patterns.MENTION);
    if (!target) [target, multiple] = await search_member(suffix, guild);

    if (!target) {
      return send(new Discord.MessageEmbed()
        .setColor(member.displayColor || guild.me.displayColor || 1)
        .setDescription(`User [${member}] not found!`)
      );
    }

    const targettype = get_target_type(target, Discord);
    if (targettype === 'user') return handle_user(Object.assign({ target, multiple }, ctx));
    return handle_member(Object.assign({ target, multiple }, ctx));
  }

  if (guild) {
    target = member;
    return handle_member(Object.assign({ target, multiple }, ctx));
  }
  target = author;
  return handle_user(Object.assign({ target, multiple }, ctx));
};

const handle_member = async({ send, target, multiple, Constants, Discord, convertTime, times }) => {
  const avatarURL = target.user.displayAvatarURL({ format: 'png', size: 2048 });
  const status = (() => {
    switch (target.presence.status) {
      case 'online': return 'online';
      case 'idle': return 'idle';
      case 'dnd': return 'dnd';
      default: return 'invis';
    }
  })();

  const rp = snekfetch.get(`${Constants.APIURL}avaround`)
    .set('Authorization', process.env.RETHINKPSWD)
    .set('Status', status)
    .set('X-Data-Src', avatarURL);


  const membername = target.displayName.replace('@', '(at)');
  let highest = 'years';
  let diff = convertTime(target.joinedAt, times.indexOf(highest));
  diff = `${diff[0]} ${times[diff[1]]}`;

  let diff3;
  highest = 'years';
  diff3 = convertTime(target.user.createdAt, times.indexOf(highest));
  diff3 = `${diff3[0]} ${times[diff3[1]]}`;
  const embed = new Discord.MessageEmbed;
  embed.addField(`${target.user.tag}: `,
    `${target.presence.activity && target.presence.activity.type ?
      target.presence.activity.type
        .replace(/(\w)(\w+)/,
          (a, b, c) => b.toUpperCase() + c.toLowerCase()) :
      'Playing'
    } ${
      target.presence.activity ?
        target.presence.activity.name :
        'nothing.'
    }`, true
  );
  embed.addField('User id:', `${target.id}`, true)
    .addField(`Nickname: ${membername}`, `Colour: ${target.displayHexColor}`, true);
  embed.addField(`Joined Discord on ${target.user.createdAt.toUTCString()}`, `That's about ${diff3} ago!`);
  embed.addField(`Joined ${target.guild.name}`, `About ${diff} ago on ${target.joinedAt.toUTCString()}`);
  // Infobad.addField(`${member.lastMessage?"Last seen here at: "+member.lastMessage.createdAt.toUTCString():
  //  "Last seen here: Unknown"}`,`${diff2!="NAN"?"That's about "+diff2+" ago!":"Time ago: Unknown"}`);
  // infobad.addField(`Colour: `,`${member.displayHexColor}`,true)
  embed.addField(`Highest Role: ${target.highestRole.name}`, `Total number of roles: ${target.roles.size}`, true);
  // Infobad.addField(`Status:`,`    ${member.presence.status}`, true);
  embed.addField(`Permissions number:`, target.permissions.bitfield);
  // Infobad.addField(`Avatar URL`, `[Click Here](${member.user.avatarURL})`);
  // infobad.setThumbnail(member.user.avatarURL);
  embed.setColor(target.displayColor || 'RANDOM');
  embed.setThumbnail(Constants.loading);
  let sentmsg;
  rp.then(async r => {
    embed.attachFiles([new Discord.MessageAttachment(r.body, 'image.png')])
      .setThumbnail('attachment://image.png');
    if (sentmsg) await sentmsg.edit(sentmsg.content, { embed });
    else sentmsg = await send(multiple ? '' : '\u200B', { embed });
    return sentmsg;
  });
  sentmsg = await send(multiple ? '' : '\u200B', { embed });
};

const handle_user = ({ send, Discord }) => {
  const embed = new Discord.MessageEmbed;
  return send(embed);
};

const get_id = (args$n, clientorguild) => {
  if (/^\d+$/.test(args$n)) {
    if ('guild' in clientorguild) {
      return clientorguild.members.fetch(args$n) || clientorguild.client.users.fetch(args$n) || null;
    } else {
      return clientorguild.users.fetch(args$n) || null;
    }
  }
  return null;
};

const get_mention = (args$n, match) => {
  if (match.test(args$n)) {
    return get_id(args$n.match(match)[1]);
  }
  return null;
};

const search_member = (args$n, guild) => {
  let ref;
  const searcher = ref = guild.client.searchers[guild.id] ? ref : searcher[guild.id] = new Searcher(guild);
  const list = searcher.searchMember(args$n);
  if (list.length < 1) return [];
  return [list[0], list.length > 0];
};

const get_target_type = (target, Discord) => {
  if (target instanceof Discord.Structures.get('GuildMember')) return 'member';
  if (target instanceof Discord.Structures.get('User')) return 'user';
  throw new Error('Unknown target type');
};
