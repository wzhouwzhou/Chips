const EXPIRE = 10000;
const STEP1EXPIRE = 60 * 60 * 1000;
const STEP2EXPIRE = 60 * 60 * 1000;
const STEP3EXPIRE = 60 * 60 * 1000;

const PREAPP = `Hi there! You are about to submit a staff application. You will only be able to submit a staff application once, so please put thought into it! Please type __y__es or react with ${Constants.emojis.CHECK} to continue. Type __n__o to cancel. You can also react with ${Constants.emojis.X} at any point during the application to cancel!`;
const CONCURRCONFLICT = 'Hi there! Greatest apologies, someone else is currently submitting an application. To prevent our system from being overloaded you cannot submit an application right now. If you believe this is in error, contact an online staff member!. Please wait a few minutes before trying again, and sorry for the inconvenience!';
const QUESTION1 = `Please enter some details about yourself, where you're from/timezone, how old you are, etc. Provide as much or as little information as you'd like, it just helps us get to know you better. To cancel the application at any time just react with ${Constants.emojis.X}`;
const QUESTION2 = 'Next, please tell us why you would like to be on the staff team. What assets would you bring that would benefit the staff team? How much time do you spend on Discord, and how much do you plan on devoting to our support server?';
const QUESTION3 = 'Finally, if you would like to, please tell us how many servers you are in with Chips in it, and how many of those you own';
temp = {};

ex = {
  name: 'applyforstaff',
  customperm: ['ADMINISTRATOR'],
  async func(msg, { reply, author, guild, channel, member, prefix }) {
    const START = `Excellent! The information you provide in your application will be confidential. Please head over to <#${Constants.channels.SUPPORT_STAFFAPPLICATION}> and type \`${_.escapeRegExp(prefix)}applyforstaff\` to begin!`;

    if (guild.id != Constants.servers.SUPPORT) return;
    if (channel.id != Constants.channels.SUPPORT_STAFFAPPLICATION) {
      if (guild.roles.get(Constants.roles.SUPPORT_STAFFAPPLICATIONROLE).members.size == 0) {
        let embed = new Discord.MessageEmbed();
        embed
          .setTitle(`${author.tag}`, author.displayAvatarURL)
          .setColor(1)
          .setDescription(PREAPP)
          .setTimestamp(new Date());
        let details = `Staff application: `;
        temp.sentmsg = await reply(details, { embed: embed });

        temp.confirmed = false; temp.agreed = false; temp.rxn = false;
        let msgCol;
        let rxnCol = temp.sentmsg.createReactionCollector(
          (reaction, user) => {
            if (user.id != author.id) return false;
            if (temp.confirmed || temp.agreed) return false;
            if (reaction.emoji.toString() == Constants.emojis.CHECK) {
              reply(`Accepted choice ${reaction.emoji.name}`).then(m => {
                setTimeout(() => m.delete(), 1000);
              });
              temp.confirmed = true;
              temp.agreed = true;
              temp.rxn = true;
              return true;
            } else if (reaction.emoji.toString() == Constants.emojis.X) {
              reply(`Accepted choice ${reaction.emoji.name}`).then(m => {
                setTimeout(() => m.delete(), 1000);
              });
              temp.confirmed = true;
              temp.rxn = true;
              temp.agreed = false;
              msgCol.end();
              return true;
            }
          },
          { max: 1, time: EXPIRE, errors: ['time'] }
        );
        msgCol = channel.createMessageCollector(
          query => {
            if (query.content) {
              if (/^(?:y(?:es)?)|(?:no?)$/i.test(query.content)) {
                if ((!temp.confirmed && !temp.agreed) && query.author.id == author.id) {
                  temp.confirmed = true;
                  temp.agreed = /^(?:y(?:es)?)$/i.test(query.content);
                  reply(`Accepted response, continuing: ${temp.agreed}`).then(m => {
                    setTimeout(() => m.delete(), 1000);
                  });
                  temp.usedmsg = true;
                  msgCol.stop();
                  return true;
                }
              }
            }
          },
          { max: 1, time: EXPIRE, errors: ['time'] }
        );

        rxnCol.on('collect', r => {
          console.log(`Collected ${r.emoji.name}`);
          rxnCol.stop();
        });
        rxnCol.on('end', collected => {
          if (temp.confirmed && temp.rxn) {
            console.log(collected.first().name);
            msgCol.stop();
          }
        });

        msgCol.on('collect', _ => _);
        msgCol.on('end', async collected => {
          if (collected.first != null) console.log('Something errored with staff app...');
          let sentmsg = temp.sentmsg;
          if (temp.usedmsg && !temp.rxn) {
            rxnCol.stop();
          }
          sentmsg.delete();
          if (!temp.confirmed) {
            return msg.reply('Application timed out!');
          }
          if (!temp.agreed) {
            return msg.reply('Staff application cancelled!');
          }
          await member.addRole(guild.roles.get('318569495486791680'));

          return reply(START);
        });

        await temp.sentmsg.react(`${Constants.emojis.CHECK}`);
        await temp.sentmsg.react(`${Constants.emojis.X}`);
      } else {
        let embed = new Discord.MessageEmbed();
        embed
          .setTitle(`${author.tag}`, author.displayAvatarURL)
          .setColor(1)
          .setDescription(CONCURRCONFLICT)
          .setTimestamp(new Date());
        let details = `Sorry! `;
        return reply(details, { embed: embed });
      }
    } else {
      temp.submitter = author.tag;
      temp.submitterid = author.id;
      temp.submitterImg = author.displayAvatarURL({ format: 'png', size: 2048 });
      temp.timestamp = new Date().toUTCString();
      let embed = new Discord.MessageEmbed();
      embed
        .setTitle(`${author.tag}`, author.displayAvatarURL({ format: 'png', size: 2048 }))
        .setColor(101010)
        .setDescription(QUESTION1)
        .setTimestamp(new Date());
      let details = `Staff application (Part 1 of 3): `;
      temp.sentmsg = await reply(details, { embed: embed });
      temp.confirmed = false; temp.next = true; temp.rxn = false;
      temp.usedmsg = false;
      let step1Col = channel.createMessageCollector(
        m => {
          if (m.author.id == author.id) {
            temp.next = true;
            return true;
          }
        },
        { max: 1, time: STEP1EXPIRE, errors: ['time'] }
      );
      let step1rxnCol = temp.sentmsg.createReactionCollector(
        (reaction, user) => {
          if (user.id != author.id) return false;
          if (temp.confirmed || !temp.next) return false;
          if (reaction.emoji.toString() == Constants.emojis.X) {
            reply(`Accepted choice ${reaction.emoji.name}`);
            temp.confirmed = true;
            temp.next = false;
            temp.rxn = true;
            return true;
          }
        }, { max: 1, time: STEP1EXPIRE, errors: ['time'] }
      );
      step1rxnCol.on('collect', _ => _);
      step1rxnCol.on('end', collected => {
        if (temp.confirmed && temp.rxn) {
          console.log(`Stopping step1 msg collector, ${collected.first()}`);
          step1Col.stop();
        }
      });
      await temp.sentmsg.react(`${Constants.emojis.X}`);
      step1Col.on('collect', _ => _);
      step1Col.on('end', async collected => {
        if (collected.first() != null) {
          reply(`Received: \n${collected.first()}`);
          temp.step1Data = collected.first().cleanContent;
          temp.next = true;
          temp.confirmed = true;
        }
        let sentmsg = temp.sentmsg;
        if (!temp.rxn) {
          step1rxnCol.stop();
        }
        sentmsg.delete();

        if (!temp.confirmed) {
          msg.reply('Application timed out!');
          temp.next = false;
        }
        if (!temp.next) {
          setTimeout(async() => {
            try {
              let msgs = await channel.messages.fetch({ limit: 100 });
              await channel.bulkDelete(msgs);
              await member.removeRole(Constants.roles.SUPPORT_STAFFAPPLICATIONROLE);
            } catch (err) {
              return reply(`Uh oh, could not end your staff application, please let an online staff know about this!`);
            }
          }, 5000);
          return msg.reply('Staff application cancelled! Please wait while we clean up everything!');
        }


        // STEP 2:
        let embed = new Discord.MessageEmbed();
        embed
          .setTitle(`${author.tag}`, author.displayAvatarURL)
          .setColor(101010)
          .setDescription(QUESTION2)
          .setTimestamp(new Date());
        let details = `Staff application (Part 2): `;
        temp.sentmsg = await reply(details, { embed: embed });
        temp.confirmed = false; temp.next = true; temp.rxn = false;
        temp.usedmsg = false;
        let step2Col = channel.createMessageCollector(
          m => {
            if (m.author.id == author.id) {
              temp.next = true;
              return true;
            }
          },
          { max: 1, time: STEP2EXPIRE, errors: ['time'] }
        );
        let step2rxnCol = temp.sentmsg.createReactionCollector(
          (reaction, user) => {
            if (user.id != author.id) return false;
            if (temp.confirmed || !temp.next) return false;
            if (reaction.emoji.toString() == Constants.emojis.X) {
              reply(`Accepted choice ${reaction.emoji.name}`);
              temp.confirmed = true;
              temp.next = false;
              temp.rxn = true;
              return true;
            }
          }, { max: 1, time: STEP2EXPIRE, errors: ['time'] }
        );
        step2rxnCol.on('collect', _ => _);
        step2rxnCol.on('end', collected => {
          if (temp.confirmed && temp.rxn) {
            console.log(`Stopping step2 msg collector, ${collected}`);
            step2Col.stop();
          }
        });
        await temp.sentmsg.react(`${Constants.emojis.X}`);
        step2Col.on('collect', _ => _);
        step2Col.on('end', async collected => {
          if (collected.first() != null) {
            reply(`Received (Step2): \n${collected.first()}`);
            temp.step2Data = collected.first().cleanContent;
            temp.next = true;
            temp.confirmed = true;
          }
          let sentmsg = temp.sentmsg;
          if (!temp.rxn) {
            step2rxnCol.stop();
          }
          sentmsg.delete();
          if (!temp.confirmed) {
            msg.reply('Application timed out!');
            temp.next = false;
          }
          if (!temp.next) {
            setTimeout(async() => {
              try {
                let msgs = await channel.messages.fetch({ limit: 100 });
                await channel.bulkDelete(msgs);
                await member.removeRole(Constants.roles.SUPPORT_STAFFAPPLICATIONROLE);
              } catch (err) {
                return reply(`Uh oh, could not end your staff application, please let an online staff know about this!`);
              }
            }, 5000);
            return msg.reply('Staff application cancelled! Please wait while we clean up everything!');
          }

          // STEP 3:
          let embed = new Discord.MessageEmbed();
          embed
            .setTitle(`${author.tag}`, author.displayAvatarURL)
            .setColor(101010)
            .setDescription(QUESTION3)
            .setTimestamp(new Date());
          let details = `Staff application (Part 3): `;
          temp.sentmsg = await reply(details, { embed: embed });
          temp.confirmed = false; temp.next = true; temp.rxn = false;
          temp.usedmsg = false;
          let step3Col = channel.createMessageCollector(
            m => {
              if (m.author.id == author.id) {
                temp.next = true;
                return true;
              }
            },
            { max: 1, time: STEP3EXPIRE, errors: ['time'] }
          );
          let step3rxnCol = temp.sentmsg.createReactionCollector(
            (reaction, user) => {
              if (user.id != author.id) return false;
              if (temp.confirmed || !temp.next) return false;
              if (reaction.emoji.toString() == Constants.emojis.X) {
                reply(`Accepted choice ${reaction.emoji.name}`);
                temp.confirmed = true;
                temp.next = false;
                temp.rxn = true;
                return true;
              }
            }, { max: 1, time: STEP3EXPIRE, errors: ['time'] }
          );
          step3rxnCol.on('collect', _ => _);
          step3rxnCol.on('end', collected => {
            if (temp.confirmed && temp.rxn) {
              console.log(`Stopping step3 msg collector, ${collected}`);
              step2Col.stop();
            }
          });
          await temp.sentmsg.react(`${Constants.emojis.X}`);
          step3Col.on('collect', _ => _);
          step3Col.on('end', async collected => {
            if (collected.first() != null) {
              reply(`Received (Step3): \n${collected.first()}`);
              temp.step3Data = collected.first().cleanContent;
              temp.next = true;
              temp.confirmed = true;
            }
            let sentmsg = temp.sentmsg;
            if (!temp.rxn) {
              step3rxnCol.stop();
            }
            sentmsg.delete();
            if (!temp.confirmed) {
              msg.reply('Application timed out!');
              temp.next = false;
            }
            setTimeout(async() => {
              try {
                let msgs = await channel.messages.fetch({ limit: 100 });
                await channel.bulkDelete(msgs);
                await member.removeRole(Constants.roles.SUPPORT_STAFFAPPLICATIONROLE);
              } catch (err) {
                return reply(`Uh oh, could not end your staff application, please let an online staff know about this!`);
              }
            }, 5000);
            console.log(temp.toString());
            if (!temp.next) {
              msg.reply('Staff application cancelled! Please wait while we clean up everything!');
            } else {
              msg.reply('Thank you for your interest! Your application has been logged. This chat will now be cleared for confidentiality.');
            }
            require('../../../handlers/Permissions').updatePermission('member', author.id, guild.id, 0, 'global.utility.applyforstaff.apply', -1)
              .then(info => console.log(`[APPLYFORSTAFF][PERMISSIONS]: ${info}`))
              .catch(err => {
                console.log(`[APPLYFORSTAFF][PERMISSIONS][ERR] Caught: ${err}`);
              });

            let log = new Discord.MessageEmbed();
            log.setTitle(`Staff application from ${temp.submitter}`);
            log.setDescription(`User id: ${temp.submitterid}, <@${temp.submitterid}>`);
            log.setThumbnail(`${temp.submitterImg}`);
            log.setFooter(`At: ${temp.timestamp}`);

            let logC = guild.channels.get(Constants.channels.SUPPORT_STAFFAPPLICATIONLOGS);
            await logC.send('\n\n\n\nIncoming Staff Application!', { embed: log });
            await logC.send(`**Question1**: ${QUESTION1}\n**Answer**: ${temp.step1Data}`);
            await logC.send(`**Question2**: ${QUESTION2}\n**Answer**: ${temp.step2Data}`);
            await logC.send(`**Question3**: ${QUESTION3}\n**Answer**: ${temp.step3Data}`);
            // Continue to end
          });
          // End step 3
        });
        // End step 2
      });
      // End step 1.
    }
  },
};
ex.submissionData = temp;

module.exports = ex;
