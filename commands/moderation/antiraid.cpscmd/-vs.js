/* eslint complexity: 'off', max-depth: 'off', consistent-return: 'off' */
const path = require('path');
const _ = require('lodash');
const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;

const ex = {};

ex.name = 'vs';
ex.func = async(msg, { send, channel, author, guild, args, gMember, reply, Discord, client, Constants }) => {
  if (!guild) return reply('You must use this in a server!');
  if (!args[0]) return reply('No action given :(');

  let action = args[0].toLowerCase();
  switch (action) {
    case 'user':
    case 'ok': {
      if (!args[1]) return reply('No user given :<');
      let targetMember;
      try {
        const target = args[1].match(Constants.patterns.MENTION)[1];
        const user = gMember(target).user;
        targetMember = guild.members.get(user.id);
      } catch (err) {
        return reply('Invalid member mentioned');
      }

      if (!targetMember.roles.get('305302877641900052') && !targetMember.roles.find('name', 'unverified') &&
        !targetMember.roles.find('name', 'Unverified') && !targetMember.roles.find('name', 'Unverified-Personel')) {
        return reply(`User does not have the unverified role!`);
      }
      try {
        let therole = targetMember.roles.find('name', 'unverified') || targetMember.roles.find('name', 'Unverified') ||
          targetMember.roles.find('name', 'Unverified-Personel');
        const ver = new Discord.MessageEmbed()
          .setTitle(`${targetMember.user.tag
          }, you are now verified and will soon have access to the other chats in the server!`);

        await send(targetMember + [], { embed: ver });
        await targetMember.removeRole(guild.roles.get('305302877641900052') || therole,
          `[VS]: [Author]: ${author.tag} [Reason]: Verify command executed`);
        // Duckio
        if (guild.id === '274260111415836675') {
          await targetMember.addRole(guild.roles.get('338625733456953344'));
          guild.channels.get('274260111415836675').send(`${targetMember + []
          } is now verified! Please be sure to read <#378680507786985472> and <#378680485309710336>.`);
        }
        if (client.memberjoin.verifyLogC[guild.id]) {
          let embed = new Discord.MessageEmbed();
          embed.setTitle('Member Verification').setColor(_.random(1, 16777215)).setTimestamp();
          embed.setDescription(`<@${targetMember.id}> was just verified by <@${author.id}>!`);
          if (guild.channels.get(client.memberjoin.verifyLogC[guild.id])) {
            guild.channels.get(client.memberjoin.verifyLogC[guild.id]).send(embed).catch(() => reply('Could not log the verification...'));
          }
        }
        return reply('User verified successfully!');
      } catch (err) {
        await reply('User not unverified :< Something went wrong..');
        throw err;
      } }

    case 'welcome': {
      if (!client.memberjoin.antiraidWelcome[guild.id]) return reply(`A welcome message has not been set for this server!`);
      return send(client.memberjoin.antiraidWelcome[guild.id]); }

    case 'panic': {
      let options = args[1] ? args[1] : 'none';

      switch (options) {
        case 'off': {
          if (client.memberjoin.panics[guild.id]) {
            client.memberjoin.panics[guild.id] = false;
            client.memberjoin.panicKick[guild.id] = false;
            await guild.setVerificationLevel(client.memberjoin.antiraidOldVL[guild.id]);
            return reply(`Panic mode has been disabled! The verification level is now ${guild.verificationLevel} again.`);
          } else {
            return reply(`Panic mode was not enabled for this server!`);
          } }
        case 'lockdown': {
          if (args[2] && args[2] === 'ban') {
            if (args[3] && ['customize', 'customise', 'c', 'set'].includes(args[3])) {
              let s = new Searcher(guild);

              let cancelA = false, cancelB = false, thesht;
              let theregex, length = false, thetimer;
              let errored = false;
              const WAITFORSHT = 60 * 1000;

              const authorFilter = m => m.author.id === author.id;

              const cancelFilter = m => m.content.toLowerCase().indexOf('cancel') > -1;

              const regexSaver = m => {
                if (!authorFilter(m)) return false;
                if (cancelFilter(m)) {
                  cancelA = true;
                  return true;
                }
                if (m.content.toLowerCase().startsWith('length:')) {
                  length = m.content.toLowerCase().replace('length:', '').replace(/\s+/g, '');
                  if (isNaN(length)) {
                    errored = true;
                    return reply(`Invalid name length of ${length}`);
                  }
                  m.channel.send(`Okay, creating a regex that matches a name with ${length} characters`);
                  theregex = new RegExp(`^\\w{${length},${length}}$`);
                } else { theregex = new RegExp(m.content.toLowerCase()); }
                m.channel.send(`Regex set as ${theregex}`);
                return true;
              };

              const regexprompter = [
                'Please enter name ban parameters. This is either a **regex** or **length of name** I will match against people here.',
                'To set a length of the name type `length:` followed by the length of the new user\'s name.',
                '\t*For example, typing `length:5` will set it so I will ban names with a length of five.*',
                'To set a regex simply type your regexp but __**omit**__ the starting and ending `/`',
                '\t*For example, if your regex is `/aregexp/` you would type `aregexp`',
                'Type __cancel__ to exit',
              ].join('\n');

              const timedBanner = m => {
                if (!authorFilter(m)) return false;
                if (cancelFilter(m)) {
                  cancelB = true;
                  return true;
                }
                if (~m.content.toLowerCase().indexOf('-1')) { thetimer = false; } else {
                  try {
                    thetimer = parseInt(m.content.toLowerCase());
                    if (isNaN(thetimer)) throw new Error('Invalid time given. Please start over');
                  } catch (err) {
                    m.reply(err.message);
                    errored = true;
                    return true;
                  }
                }
                thesht = m;
                return true;
              };

              const timedprompter = [
                '**Please enter a whole number (in minutes) that will be banned with the matcher you just set.**',
                '\t*For example, typing `5` will set it so people who joined within 5 minutes ago whos names match ' +
                  'the criteria you set above will be banned*',
                'Type __cancel__ to exit, or __-1__ to ban all matches regardless of join time',
              ].join('\n');

              const confirmSettings = m => {
                if (!authorFilter(m)) return false;
                if (/^(?:y(?:es)?)|(?:no?)$/i.test(m.content.toLowerCase())) {
                  errored = !/^(?:y(?:es)?)$/i.test(m.content.toLowerCase());
                  return true;
                }
                return false;
              };

              const useregex_duringraid = [
                'Would you like to use this regex to ban members during the raid?',
                '**Type __y__es to ban members who match this regex or __n__o to ban all members who join when the panic is active.**',
              ];

              const imagehash_duringraid = [
                'Would you like to autoban members with an image during the raid?',
                '**Type __y__es to setup or __n__o to ban all members who join when the panic is active.**',
              ];

              try {
                await channel.send(regexprompter);
                await channel.awaitMessages(regexSaver, { max: 1, time: WAITFORSHT, errors: ['time'] });
                if (cancelA) return reply('Cancelled');
                if (errored) return;

                await channel.send(timedprompter);
                await channel.awaitMessages(timedBanner, { max: 1, time: WAITFORSHT, errors: ['time'] });
                if (cancelB) return reply('Cancelled');
                if (errored) return;
                let membersToBan = [];
                let a = s.searchMember(theregex);
                if (thetimer) {
                  a.forEach(me => {
                    if (Math.abs(Date.now() - me.joinedAt) < (parseInt(thetimer) * 601000)) membersToBan.push(me);
                  });
                } else { membersToBan = a; }
                const confirmation = [
                  'This is just to confirm...',
                  '**You are about to activate panic lockdown and ban users who match this criteria:**',
                  length ? `\tUsername length is ${length}` : `\tName passes this regexp: ${theregex}`,
                  thetimer ? `\tUser joined within the last ${thetimer} minutes` :
                    '\tThe length of time the user has been in the server does not matter',
                  `This apples to __${membersToBan.length}__ member(s).`,
                  '**Type __y__es or __n__o.**',
                ].join('\n');
                await channel.send(confirmation);
                await channel.awaitMessages(confirmSettings, { max: 1, time: WAITFORSHT, errors: ['time'] });
                if (errored) return reply('Cancelled');

                send(`Banning ${membersToBan.length} member(s)`);
                membersToBan.forEach(m => m.ban(`Antiraid rules set by ${thesht.author.tag}`));
              } catch (timed) {
                return reply('Timed out');
              }
            }
            if (client.memberjoin.panicKick[guild.id]) return reply('Panic lockdown is already enabled!');
            options = 'lockdown ';
            if (!client.memberjoin.panics[guild.id]) client.memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
            await guild.setVerificationLevel(4);
            client.memberjoin.panics[guild.id] = true;
            client.memberjoin.panicBan[guild.id] = true;
            return reply(`Panic lockdown ban activated, verification level is now ${guild.verificationLevel}, and autoban initiated!`);
          } else {
            if (client.memberjoin.panicKick[guild.id]) return reply('Panic lockdown is already enabled!');
            options = 'lockdown ';
            if (!client.memberjoin.panics[guild.id]) client.memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
            await guild.setVerificationLevel(4);
            client.memberjoin.panics[guild.id] = true;
            client.memberjoin.panicKick[guild.id] = true;
            return reply(`Panic lockdown activated, verification level is now ${guild.verificationLevel
            }, and new members who join during this time will get kicked!`);
          } }

        case 'none': {
          if (memberjoin.panics[guild.id]) return reply('Panic is already enabled!');
          memberjoin.antiraidOldVL[guild.id] = guild.verificationLevel;
          await guild.setVerificationLevel(3);
          memberjoin.panics[guild.id] = true;
          return reply(`Panic activated, verification level is now ${guild.verificationLevel}`); }
      }
      return reply('Something went wrong..');
    }

    case 'panicoff': {
      if (memberjoin.panics[guild.id] != null && memberjoin.panics[guild.id]) {
        memberjoin.panics[guild.id] = false;
        memberjoin.panicKick[guild.id] = false;
        await guild.setVerificationLevel(memberjoin.antiraidOldVL[guild.id]);
        return reply(`Panic mode has been disabled! The verification level is now ${guild.verificationLevel} again.`);
      } else {
        return reply(`Panic mode was not enabled for this server!`);
      } }

    case 'setUnverifiedChannel ': { // Disabling
      if (!args[1]) return send('No channel given :<');
      try {
        const target = args[1].match(Constants.patterns.CHANNEL)[1];
        return target;
      } catch (err) {
        return reply('Invalid #channel specified');
      } }

    case 'regenperms': {
      const unverRole = guild.roles.find('name', 'Unverified') || guild.roles.find('name', 'Unverified-Personel');
      const unverChan = guild.channels.find('name', 'unverified');
      if (!unverRole || !unverChan) return reply('Uh oh! Antiraid role and channel names are not set properly');
      const channels = guild.channels.filter(c => c.type === 'text');
      const cproms = [];
      send('Regenerating permissions...');
      for (const c of channels.values()) {
        cproms.push(c.overwritePermissions(unverRole, {
          SEND_MESSAGES: false,
        }));
      }

      await Promise.all(cproms);

      await unverChan.overwritePermissions(unverRole, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true,
      });

      return send('Done!'); }

    default: {
      return send('Did you mean to specify an action? i.e. "verify user", "verify lockdown" etc'); }
  }
};

module.exports = ex;
