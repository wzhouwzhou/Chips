/* eslint complexity: 'off', no-console: 'off', max-len: 'off' */
const path = require('path');
const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;
const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;
const snekfetch = require('snekfetch');
const _ = require('lodash');
let helpembed = null;

const moment = require('moment');
const cnsfwimg = 'https://cdn.discordapp.com/attachments/294328677095964672/458495588112269312/textchannel-v2-nsfw.png',
  cvoiceimg = 'https://cdn.discordapp.com/attachments/294328677095964672/458495589454446602/voicechannel-v2.png',
  ctextimg = 'https://cdn.discordapp.com/attachments/294328677095964672/458495586539405315/textchannel-v2.png',
  ccatimg = 'https://cdn.discordapp.com/attachments/294328677095964672/458495585524252682/category-v2.png';
const regionreplaced = {
  'eu-central': [':flag_eu:', 'Central Europe'],
  'eu-west': [':flag_eu:', 'Western Europe'],
  brazil: [':flag_br:', 'Brazil'],
  hongkong: [':flag_hk:', 'Hong Kong'],
  japan: [':flag_jp:', 'Japan'],
  russia: [':flag_ru:', 'Russia'],
  singapore: [':flag_sg:', 'Singapore'],
  sydney: [':flag_au:', 'Sydney'],
  'us-central': [':flag_us:', 'Central US'],
  'us-east': [':flag_us:', 'Eastern US'],
  'us-south': [':flag_us:', 'Southern US'],
  'us-west': [':flag_us:', 'Western US'],
  'vip-amsterdam': [':flag_nl:', 'Amsterdam (VIP)'],
  'vip-us-east': [':flag_us:', 'Eastern US (VIP)'],
  'vip-us-west': [':flag_us:', 'Western US (VIP)'],
};

const ex = {
  name: 'info',
  async func(msg, { Constants, client, send, member, author, guild, args, gMember, reply, content, prefix, Discord, times, convertTime, getUser }) {
    let start = process.hrtime();
    const used = member || author;
    let action;
    if (!helpembed) {
      helpembed = new Discord.MessageEmbed();
      helpembed.setTitle('The Info Command');
      helpembed.setDescription([
        'This command must be used with a given "action":',
        '**{} user [@ mention or fuzzy search]** returns info about a member in a server\\*',
        '**{} channel [#channel or fuzzy search]** returns info about a particular channel\\*',
        '**{} guild** or **{} server** returns info about the server you are in\\*',
        '**{} role [@ mention or fuzzy search]** returns info about a role\\*',
        '**{} bot** shows some basic info about me!',
        'Any subcommands with a \\* following their usage must be used in a server',
      ].join('\n').replace(/\{\}/g, `${_.escapeRegExp(prefix)}${this.name}`));
    }
    if (!args[0]) return send(helpembed);
    else action = args[0];

    // Console.log(`[Info] Action: ${action}`);
    // Console.log(`[Info] Creating new searcher for guild ${guild.id}`);
    if (guild) {
      let options = { guild: guild };
      global.searchers[guild.id] = new Searcher(options.guild);
    }
    let infobad = new Discord.MessageEmbed().setColor(member ? member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`
    ).setFooter(new Date());

    if (action === 'bot') {
      try {
        await global.permissions.checkMulti(msg, ['public.info.*']);
      } catch (err) {
        return msg.reply(err);
      }

      infobad.setTitle('Hello, I am Chips!');
      infobad.setDescription([
        'I am here to make your life a little bit more exciting! Fun and games, music, utilities, quick and easy moderation, as well as informational commands, I have it all!',
        `I have **${Object.keys(client.commands).length}** useful commands (including aliases), con4, chess and more!`,
        `Do **${_.escapeRegExp(prefix)}help** to see a list of my commands, or **${_.escapeRegExp(prefix)}stats** to see my real-time statistics!`,
        'Read more about me on my [website](https://chipsbot.me:2087/) or join the [support server](https://support.chipsbot.me/)!',
        'To add me to your server, click [here](https://invite.chipsbot.me)',
      ].join('\n'));
      return send(infobad);
    }
    if (!guild) return send(helpembed);
    if (action === 'server' || action === 'guild') {
      try {
        let info = await global.permissions.checkMulti(msg, ['global.info.info.server']);
        console.log(`[Command] ${info}`);
      } catch (err) {
        if (!member.hasPermission('global.info.info.server')) {
          console.log(`Rejected info server to ${used.id}`);
          return msg.reply(err);
        }
      }
      if (args[1] === 'verbose') {
        let diff = moment().diff(guild.createdAt, 'days');

        let trueMemC = guild.members.filter(member => !member.user.bot);
        let online = 0, idle = 0, dnd = 0, available = 0;
        guild.presences.filter(presence => {
          switch (presence.status) {
            case 'online':
              online++;
              available++;
              break;

            case 'idle':
              idle++;
              available++;
              break;

            case 'dnd':
              dnd++;
              available++;
              break;
          }
          return true;
        });

        let textC = 0, voiceC = 0, categoryC = 0, tC = 0, nsfw = 0;
        guild.channels.filter(c => {
          if (c.type === 'text') textC++;
          else if (c.type === 'voice') voiceC++;
          else if (c.type === 'category') categoryC++;
          tC++;
          if (c.nsfw) nsfw++;
          return true;
        });

        let vInfo = 'there is no verification requirement.';
        let vLvl = guild.verificationLevel;
        if (vLvl >= 1) vInfo = 'New users without a role must have an email linked to their account. ';
        if (vLvl >= 2) vInfo += 'They must also be registered on Discord for more than five minutes. ';
        if (vLvl >= 3) vInfo += 'In addition, upon joining, new members without a role must wait 10 minutes before they are able to speak. ';
        else if (vLvl >= 4) vInfo += 'In addition, upon joining, new users without a role must verify themselves with a mobile device before they are able to speak. ';
        let highestRole = guild._sortedRoles().last();
        let gname = guild.name.replace('@', '(at)');

        const data = {
          type: 'paged',
          embedding: true,
          fielding: true,
          title: [
            'Server Info',
            `Emoji List! # of emotes: ${guild.emojis.size}`,
          ],
          text: author + [],
          description: [
            '.',
            `${guild.emojis.array().join(' ')}${guild.iconURL({ size: 2048, format: 'png' }) ? '\n\n**Server icon:**' : ''}`,
          ],
          pages:
          [[
            [`Name of this server: ${gname}`, `Guild id: ${guild.id}`],
            [`Server created on ${guild.createdAt.toUTCString()} about ${diff} days ago!`, `Server owner: <@${guild.ownerID}> (${getUser(guild.ownerID).tag})`],
            [`${guild.members.size} member(s): ${trueMemC.size} ${trueMemC.size === 1 ? 'person' : 'people'}, ${guild.members.size - trueMemC.size} ${guild.members.size - trueMemC.size === 1 ? 'bot' : 'bots'}`, [
              `Reachable member(s) (online, idle or dnd): **${available}**\n`,
              ...[
                ['<:online:313956277808005120>', online],
                ['<:away:313956277220802560>', idle],
                ['<:dnd:313956276893646850>', dnd],
                ['<:offline:313956277237710868>', guild.members.size - available],
              ].map(e => `${e[0]}: **${e[1]}**`),
            ].join(' ')],
            [`Number of roles: ${guild.roles.size}`, `${highestRole.members.size} members with the highest role: ${highestRole.name} (${highestRole.id})`],
            [
              `Total number of channels: ${tC}`,
              `Text: **${textC}**\nNsfw: **${nsfw}**\nVoice: **${voiceC}**\n»Categories: ${categoryC}«`,
            ],
            [`Server region (voice): ${guild.region}`, `AFK voice channel: ${guild.afkChannelID ? `#${guild.channels.get(guild.afkChannelID).name}` : ''}\n${guild.afkChannelID ? `Timeout: ${guild.afkTimeout / 60} minute(s)` : 'None'}`, true],
            [`Verification level: ${vLvl}`, `That means ${vInfo}`],
          ], []],
          image: [
            null,
            guild.iconURL({ size: 2048, format: 'png' }) || null,
          ],
          thumbnail: [
            guild.iconURL({ size: 2048, format: 'png' }) || null,
          ],
          author: [
            client.user.tag,
            'Server Emojis',
          ],
          color: member.displayColor,
        };

        let hrTime = process.hrtime(start);
        let µs = false;
        let end = hrTime[0] * 1000 + hrTime[1] / 1000000;
        if (end < 1) {
          µs = true;
          end = hrTime[0] * 1000000 + hrTime[1] / 1000;
        }
        µs ? end += 'µs' : end += 'ms';
        data.footer = `--Server info lookup and calculations took ${(end)}.--`;

        try {
          const p = new Paginator(msg, data, Discord);
          return await p.sendFirst();
        } catch (err) {
          console.error(err);
          return reply('Something went wrong...');
        }
      } else {
        const diff = moment().diff(guild.createdAt, 'days'),
          botc = guild.members.filter(mm => mm.user.bot).size;
        const available = guild.presences.filter(presence => ['online', 'idle', 'dnd'].includes(presence.status)).size;
        const embed = new Discord.MessageEmbed;
        embed.setThumbnail(guild.iconURL({ format: 'png', size: 512 }));
        embed.setTitle(guild.name);
        embed.addField(`Server owner: ${guild.owner.user.tag}`, `Created ${diff} days ago on ${guild.createdAt.toUTCString()}.`);
        embed.addField(`${available}/${guild.members.size} members available, ${botc} bots.`,
          `${guild.emojis.size} emojis | ${guild.roles.filter(rr => rr.members.size).size}/${guild.roles.size} roles used`);
        embed.addField(`${guild.channels.size} channels: ${guild.channels.filter(c => c.type === 'voice').size} voice and ${
          guild.channels.filter(c => c.type === 'category').size} categories.`,
        `Voice region: ${regionreplaced[guild.region][0]}${regionreplaced[guild.region][1]} | Verification level: ${guild.verificationLevel}`);

        embed.setColor(guild.owner.displayColor || guild.me.displayColor || 1);
        embed.setFooter(`Server ID: ${guild.id} | Requested by ${author.tag}`);
        return send(embed);
      }
      // /await reply(`Server info`, {embed: infobad});
    } else if (action === 'user') {
      const waitingE = new Discord.MessageEmbed().attachFiles(['loading.gif']).setAuthor('Loading...', 'attachment://loading.gif', 'http://chipsbot.tk')
        .setColor(msg.member ? msg.member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`);
      const waiting = await send(' ', { embed: waitingE });

      let member = used;

      let multiple = false;
      if (args[1]) {
        try { // Get mention:
          console.log('Trying to find user by mention..');
          let target = args[1].match(Constants.patterns.MENTION)[1];
          member = gMember(target);
          if (member.id != author.id) {
            try {
              let info = await permissions.checkMulti(msg, ['global.info.info.user.other']);
              console.log(`[Info] ${info}`);
            } catch (err) {
              if (!member.hasPermission(this.metadata.customperm[0])) {
                console.log(`Rejected info user other to ${used.id}`);
                return msg.reply(err);
              }
            }
          } else {
            try {
              let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
              console.log(`[Info] ${info}`);
            } catch (err) {
              if (!member.hasPermission(this.metadata.customperm[0])) {
                console.log(`Rejected info self other to ${used.id}`);
                return msg.reply(err);
              }
            }
          }
          if (member == null) throw 'NotMemberMention';
        } catch (err) { // GMember failed:
          console.log('Finding by mention failed...');
          member = content.substring(`${prefix}info ${action} `.length);
          let list = searchers[guild.id].searchMember(member);
          if (list.length > 1) multiple = true;
          else if (list.length < 1) {
            waiting.delete();
            return send(new Discord.MessageEmbed().setColor(member.displayColor).setDescription(`User [${member}] not found!`));
          }
          member = list[0];
          if (member.id != author.id) {
            try {
              let info = await permissions.checkMulti(msg, ['global.info.info.user.other']);
              console.log(`[Info] ${info}`);
            } catch (err) {
              if (!member.hasPermission(this.metadata.customperm[0])) {
                console.log(`Rejected info user other to ${used.id}`);
                return msg.reply(err);
              }
            }
          } else {
            try {
              let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
              console.log(`[Info] ${info}`);
            } catch (err) {
              if (!member.hasPermission(this.metadata.customperm[0])) {
                console.log(`Rejected info self other to ${used.id}`);
                return msg.reply(err);
              }
            }
          }
        }
        const name = `${member.id}${process.hrtime().join('')}profileEdited.png`;
        const embed = await userData({ Discord, Constants, member, infobad, convertTime, times, name });
        waiting.delete();
        return send(`${multiple ? '(multiple users were found, using the first one)' : ''}`, { embed });
      } else {
        try {
          let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
          console.log(`[Command] ${info}`);
        } catch (err) {
          if (!member.hasPermission(this.metadata.customperm[0])) {
            console.log(`Rejected info user (self) to ${used.id}`);
            return msg.reply(err);
          }
        }
        const embed = await userData({ Discord, Constants, member, infobad, convertTime, times });
        waiting.delete();
        return send('', { embed });
      }
    } else if (action == 'role') {
      try {
        let info = await permissions.checkMulti(msg, ['global.info.info.role']);
        console.log(`[Command] ${info}`);
      } catch (err) {
        if (!member.hasPermission(this.metadata.customperm[0])) {
          console.log(`Rejected info role to ${used.id}`);
          return msg.reply(err);
        }
      }

      if (!args[1]) { return send('No role given :<'); } else {
        let role;
        try {
          role = args[1].substring(3, args[1].length - 1);
          console.log(`Trying to find role from mention ${role}`);
          role = guild.roles.get(role);
          if (!role) throw 'NotRoleId';
        } catch (err) { // Failed to find by id
          role = content.substring(`${prefix}info ${action} `.length);
          let list = searchers[guild.id].searchRole(role);
          if (list.length > 1) {
            await send('Multiple matches found, using first one..');
          } else if (list.length < 1) {
            return send(new Discord.MessageEmbed().setColor(member.displayColor).setDescription(`Role [${role}] not found!`));
          }
          role = list[0];
        }
        let rolename = role.name.replace('@', '(at)');

        let diff;
        highest = 'years';
        if (role) {
          diff = await convertTime(role.createdAt, times.indexOf(highest));
          // Send("diff2-1: " + diff2);
          diff = `${diff[0]} ${times[diff[1]]}`;
          // Send("diff2-2: " + diff2);
        } else { diff = 'NAN'; }

        let memList = '';
        for (mem of role.members.array()) {
          memList += `[<@${mem.id}>] `;
          if (memList.length > 1000) {
            memList = 'Member list is too long!';
            break;
          }
        }

        let trueMemC = role.members.filter(member => !member.user.bot);
        let online = 0, idle = 0, dnd = 0, available = 0;
        role.members.filter(member => {
          switch (member.presence.status) {
            case 'online':
              online++;
              available++;
              break;

            case 'idle':
              idle++;
              available++;
              break;

            case 'dnd':
              dnd++;
              available++;
              break;
          }
          return true;
        });
        infobad.setColor(role.color);
        infobad.setTitle(`Role Lookup for role [${rolename}]`); // <@&${role.id}>`);
        infobad.addField(`Role id: `, `${role.id}`);
        infobad.addField(`Creation date: ${role.createdAt.toUTCString()}`, `That's about ${diff} ago!`);
        infobad.addField(`${role.members.size} member(s): ${trueMemC.size} ${trueMemC.size === 1 ? 'person' : 'people'}, ${role.members.size - trueMemC.size} ${role.members.size - trueMemC.size === 1 ? 'bot' : 'bots'}`, [
          `Reachable member(s) (online, idle or dnd): **${available}**\n`,
          ...[
            ['<:online:313956277808005120>', online],
            ['<:away:313956277220802560>', idle],
            ['<:dnd:313956276893646850>', dnd],
            ['<:offline:313956277237710868>', role.members.size - available],
          ].map(e => `${e[0]}: **${e[1]}**`),
        ].join(' '));
        infobad.addField(`Mentionable: `, `${role.mentionable}`, true);
        infobad.addField(`Role Colour: `, `${role.hexColor}`, true);
        infobad.addField(`Hoist: ${role.hoist}`, `This means that the role is ${role.hoist ? '' : 'not '}displayed separately in the member list.`);
        infobad.addField(`Position: ${role.rawPosition + 1}`, `This means that the role is ${role.rawPosition + 1 + 1 == guild.roles.size ? '1st' : role.rawPosition + 1 + 2 == guild.roles.size ? '2nd' : role.rawPosition + 1 + 3 == guild.roles.size ? '3rd' : `${guild.roles.size - role.rawPosition + 1}th`} highest in this server!`);
        infobad.addField(`Members with this role: `, `${memList ? memList : 'Nobody has this role!'}`);
        return await reply(`Role information: `, { embed: infobad });
        // Return await send(`Role Id: ${role.id}\nRole Name: ${rolename}\nMember count: ${role.members.size}`);
      }
    } else if (action == 'channel') {
      try {
        let info = await permissions.checkMulti(msg, ['global.info.info.channel']);
        console.log(`[Command] ${info}`);
      } catch (err) {
        if (!member.hasPermission(this.metadata.customperm[0])) {
          console.log(`Rejected info channel to ${used.id}`);
          return msg.reply(err);
        }
      }
      let channel;
      if (!args[1]) channel = msg.channel;
      if (!channel) {
        try {
          channel = args[1].substring(2, args[1].length - 1);
          console.log(`Trying to find channel from link ${channel}`);
          channel = guild.channels.get(channel);
          if (!channel) throw new Error('NotChannelId');
        } catch (err) {
          channel = content.substring(`${prefix}info ${action} `.length);
          let list = global.searchers[guild.id].searchChannel(channel);
          if (list.length > 1) {
            await send('Multiple matches found, using first one..');
          } else if (list.length < 1) {
            return send(new Discord.MessageEmbed().setColor(member.displayColor).setDescription(`Channel [${channel}] not found!`));
          }
          channel = list[0];
        }
      }
      if (args[1] === 'legacy' || args[1] === 'verbose') {
        if (channel) {
          let cname = channel.name.replace('@', '(at)');

          let diff;
          highest = 'years';
          if (channel) {
            diff = await convertTime(channel.createdAt, times.indexOf(highest));
            // Send("diff2-1: " + diff2);
            diff = `${diff[0]} ${times[diff[1]]}`;
            // Send("diff2-2: " + diff2);
          } else { diff = 'NAN'; }

          let memList = '';
          for (mem of channel.members.array()) {
            memList += `[<@${mem.id}>] `;
            if (memList.length > 1000) {
              memList = 'Member list is too long!';
              break;
            }
          }

          let trueMemC = channel.members.filter(member => !member.user.bot);
          let online = 0, idle = 0, dnd = 0, available = 0;
          trueMemC.filter(member => {
            switch (member.presence.status) {
              case 'online':
                online++;
                available++;
                break;

              case 'idle':
                idle++;
                available++;
                break;

              case 'dnd':
                dnd++;
                available++;
                break;
            }
            return true;
          });
          infobad.setTitle(`Channel Lookup for channel [${cname}]`);
          infobad.addField(`Channel Topic:`, `${channel.topic ? channel.topic : 'None'}`);
          infobad.addField(`Channel ID: `, `${channel.id}`);
          infobad.addField(`Creation date: ${channel.createdAt.toUTCString()}`, `That's about ${diff} ago!`);

          memList && infobad.addField(`${channel.members.size} member(s): ${trueMemC.size} ${trueMemC.size === 1 ? 'person' : 'people'}, ${channel.members.size - trueMemC.size} ${channel.members.size - trueMemC.size === 1 ? 'bot' : 'bots'}`, [
            `Reachable member(s) (online, idle or dnd): **${available}**\n`,
            ...[
              ['<:online:313956277808005120>', online],
              ['<:away:313956277220802560>', idle],
              ['<:dnd:313956276893646850>', dnd],
              ['<:offline:313956277237710868>', channel.members.size - available],
            ].map(e => `${e[0]}: **${e[1]}**`),
          ].join(' '));

          infobad.addField(`Position: ${channel.rawPosition + 1}`, `The channel is ${channel.rawPosition + 1 == 0 ? '1st' : channel.rawPosition + 1 == 1 ? '2nd' : channel.rawPosition + 1 == 2 ? '3rd' : `${channel.rawPosition + 1 + 1}th`} on the channel list in the sidebar ${channel.parent ? `and ${channel.position + 1 == 0 ? '1st' : channel.position + 1 == 1 ? '2nd' : channel.position + 1 == 2 ? '3rd' : `${channel.position + 1 + 1}th`} under the ${channel.parent.name} divider` : ''}!`);
          // Infobad.addField(`Permission Overwrite Count: `,`${channel.permissionOverwrites.size}`);
          channel.type === 'text' && channel.nsfw && infobad.setThumbnail('https://i.imgur.com/PU6uVhu.png');
          memList && infobad.addField(`Members with access to this channel: `, memList);
          return await reply(`Channel information: `, { embed: infobad });
        }
      } else {
        let diff = channel ? moment().diff(channel.createdAt, 'days') : '∞';

        const posn = channel.position + 1;
        const last = posn % 10;
        const pos = last === 1 ? '1st' : last === 1 ? '2nd' : last === 3 ? '3rd' : `${posn}th`;
        const embed = new Discord.MessageEmbed;
        embed.setTitle(`${channel.type[0].toUpperCase()}${channel.type.slice(1).toLowerCase()} ${channel.type === 'category' ? '' : 'Channel'} ${channel.type === 'text' ? '#' : ''}${channel.name}`);
        embed.setFooter(`Channel ID: ${channel.id} | Requested by ${author.tag}`);
        if (channel.type === 'text') {
          embed.setDescription(`**Topic:** ${channel.topic}`);
          embed.addField(`Created ${diff} days ago on ${channel.createdAt.toUTCString()}`,
            `${pos} channel under "${channel.parent.name}" category`);
          embed.addField(`${channel.members.filter(m => ['online', 'idle', 'dnd'].includes(m.presence.status)).size}/${channel.members.size} members with access available.`,
            `${channel.permissionOverwrites.size} permission overwrite${channel.permissionOverwrites.size === 1 ? '' : 's'}.`);
          if (channel.nsfw) {
            embed.setThumbnail(cnsfwimg);
          } else {
            embed.setThumbnail(ctextimg);
          }
        } else if (channel.type === 'voice') {
          embed.setThumbnail(cvoiceimg);
          embed.addField(`Created ${diff} days ago on ${channel.createdAt.toUTCString()}`,
            `${pos} channel under "${channel.parent.name}" category.`);
          embed.addField(`${channel.members.size || 'No'}${channel.userLimit ? `/${channel.userLimit}` : ''} member${channel.members.size === 1 ? '' : 's'} connected.`,
            `${channel.permissionOverwrites.size} permission overwrite${channel.permissionOverwrites.size === 1 ? '' : 's'}.`);
        } else if (channel.type === 'category') {
          embed.setDescription(`Created ${diff} days ago on ${channel.createdAt.toUTCString()}`);
          embed.addField(`${pos} category on the sidebar.`,
            `${channel.permissionOverwrites.size} permission overwrite${channel.permissionOverwrites.size === 1 ? '' : 's'}.`);
          embed.setThumbnail(ccatimg);
          embed.setFooter(`Category ID: ${channel.id} | Requested by ${author.tag}`);
        }
        embed.setColor(guild.owner.displayColor || guild.me.displayColor || 1);
        return send(embed);
      }
    }
  },
};

const userData = ({ Constants, member, infobad, convertTime, times, Discord }) => new Promise(async res => {
  const avatarURL = member.user.displayAvatarURL({ format: 'png', size: 2048 });

  const status = (() => {
    switch (member.presence.status) {
      case 'online': return 'online';
      case 'idle': return 'idle';
      case 'dnd': return 'dnd';
      default: return 'invis';
    }
  })();

  const r = await snekfetch.get(`${Constants.APIURL}avaround`)
    .set('Authorization', process.env.RETHINKPSWD)
    .set('Status', status)
    .set('X-Data-Src', avatarURL);

  const membername = member.displayName.replace('@', '(at)');
  let highest = 'years';
  let diff = await convertTime(member.joinedAt, times.indexOf(highest));
  diff = `${diff[0]} ${times[diff[1]]}`;

  /* Let diff2;
    highest = "years";
    if(member.lastMessage){
      diff2 = await convertTime(member.lastMessage.createdAt,times.indexOf(highest));
      //send("diff2-1: " + diff2);
      diff2 = `${diff2[0]} ${times[diff2[1]]}`;
      //send("diff2-2: " + diff2);
    }else diff2="NAN";*/

  let diff3;
  highest = 'years';
  diff3 = await convertTime(member.user.createdAt, times.indexOf(highest));
  diff3 = `${diff3[0]} ${times[diff3[1]]}`;
  infobad.addField(`${member.user.tag}: `,
    `${member.presence.activity && member.presence.activity.type ?
        member.presence.activity.type
        .replace(/(\w)(\w+)/,
          (a, b, c) => b.toUpperCase() + c.toLowerCase()) :
          'Playing'
      } ${
        member.presence.activity ?
        member.presence.activity.name :
        'nothing.'
      }`, true
  );
  infobad.addField('User id:', `${member.id}`, true)
    .addField(`Nickname: ${membername}`, `Colour: ${member.displayHexColor}`, true);
  infobad.addField(`Joined Discord on ${member.user.createdAt.toUTCString()}`, `That's about ${diff3} ago!`);
  infobad.addField(`Joined ${member.guild.name}`, `About ${diff} ago on ${member.joinedAt.toUTCString()}`);
  // Infobad.addField(`${member.lastMessage?"Last seen here at: "+member.lastMessage.createdAt.toUTCString():"Last seen here: Unknown"}`,`${diff2!="NAN"?"That's about "+diff2+" ago!":"Time ago: Unknown"}`);
  // infobad.addField(`Colour: `,`${member.displayHexColor}`,true)
  infobad.addField(`Highest Role: ${member.highestRole.name}`, `Total number of roles: ${member.roles.size}`, true);
  // Infobad.addField(`Status:`,`    ${member.presence.status}`, true);
  infobad.addField(`Permissions number:`, member.permissions.bitfield);
  // Infobad.addField(`Avatar URL`, `[Click Here](${member.user.avatarURL})`);
  // infobad.setThumbnail(member.user.avatarURL);
  infobad.setColor(member ? member.displayColor : `#${((1 << 24) * Math.random() | 0).toString(16)}`)
    .attachFiles([new Discord.MessageAttachment(r.body, 'image.png')])
    .setThumbnail('attachment://image.png');
  return res(infobad);
});

module.exports = ex;
