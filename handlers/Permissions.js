/* eslint complexity: 'off' */
'use strict';
const ex = {};
const Constants = require('../setup/Constants');

ex.permsList = [
  ['OWNER.*', false],
  ['OWNER.owner.*', false], // 0
  ['OWNER.owner.announce', false], // 7
  ['OWNER.owner.botpanic', false], // 9
  ['OWNER.owner.setchannels.*', false],
  ['OWNER.owner.setchannels.setdm', false],
  ['OWNER.owner.setchannels.setoutput', false],
  ['OWNER.owner.setchannels.slogstatus', false],
  ['OWNER.eval.*', false],
  ['OWNER.eval.async', false],
  ['OWNER.eval.js', false],
  ['OWNER.eval.python', false],
  ['OWNER.eval.git', false],
  ['public.*', true],
  ['public.info.*', true],
  ['public.info.link.*', true],
  ['public.info.link.invite', true],
  ['public.info.link.website', true],
  ['public.info.stats.*', true],
  ['public.info.stats.stats', true],
  ['public.info.support.*', true],
  ['public.info.support.support', true],
  ['public.info.userid', true],
  ['global.*', false],
  ['global.custom.*', false],
  ['global.custom.points.*', true],
  ['global.custom.points.self', true],
  ['global.custom.points.other', true],
  ['global.custom.lewdme.*', true],
  ['global.custom.chipsSupport.*', true],
  ['global.custom.newfag.*', false],
  ['global.chipsmusic.*', true],
  ['global.chipsmusic.music.*', true],
  ['global.chipsmusic.music.play', true],
  ['global.fun.*', false],
  ['global.games.*', true],
  ['global.games.chess.*', true],
  ['global.games.chess.play', true],
  ['global.games.con4.*', true],
  ['global.games.con4.play', true],
  ['global.fun.-ban.*', false],
  ['global.fun.-ban.-ban', false], // 4
  ['global.fun.animals.*', true],
  ['global.fun.animals.dog', true], // 13
  ['global.fun.animals.cat', true], // 10
  ['global.fun.eat.*', true],
  ['global.fun.eat.eat', true], // 14
  ['global.8ball.*', true],
  ['global.8ball.8ball', true],
  ['global.fun.happy.*', true],
  ['global.fun.happy.happy', true], // 18
  ['global.fun.random.*', true],
  ['global.fun.random.coinflip', true], // 12
  ['global.fun.random.roll', true],
  ['global.fun.say.*', false],
  ['global.fun.say.say', false],
  ['global.fun.search.*', true],
  ['global.fun.search.lmgtfy', true],
  ['global.fun.ship', true],
  ['global.fun.text.*', true],
  ['global.fun.text.achievement', true],
  ['global.fun.text.reverse', true],
  ['global.fun.text.spooky', true],
  ['global.fun.text.rotate', true],
  ['global.fun.text.randomcaps', true],
  ['global.fun.text.big', true],
  ['global.fun.text.3d', true],
  ['global.fun.text.3d2', true],
  ['global.fun.text.ascii', true],
  ['global.fun.text.derp', true],
  ['global.fun.text.haiku', true],
  ['global.fun.image.*', true],
  ['global.fun.image.triggered', true],
  ['global.fun.image.invert', true],
  ['global.fun.image.neko', true],
  ['global.fun.image.warp', true],
  ['global.fun.image.magik', true],
  ['global.fun.image.pinged', true],
  ['global.fun.weeb.*', true],
  ['global.fun.weeb.hug', true],
  ['global.fun.weeb.kiss', true],
  ['global.fun.weeb.slap', true],
  ['global.fun.weeb.tickle', true],
  ['global.fun.triggers.*', true],
  ['global.fun.triggers.aboose', true], // 6
  ['global.fun.triggers.confoosed', true],
  ['global.fun.triggers.exposed', true], // 17
  ['global.fun.triggers.fail', true],
  ['global.fun.triggers.lenny', true],
  ['global.fun.triggers.rekt', true],
  ['global.fun.triggers.everyone', true],
  ['global.fun.triggers.googleit', true],
  ['global.info.*', true],
  ['global.info.discordstatus.*', true],
  ['global.info.discordstatus.discordstatus', true],
  ['global.info.avatar', true],
  ['global.info.channels', true],
  ['global.info.channelname', true],
  ['global.info.channeltopic', true],
  ['global.info.count.*', true],
  ['global.info.count.channelcount', true],
  ['global.info.count.emojicount', true],
  ['global.info.count.membercount', true],
  ['global.info.count.rolecount', true],
  ['global.info.emojis', true],
  ['global.info.help.*', true],
  ['global.info.help.help', true],
  ['global.info.id.*', true],
  ['global.info.id.serverid', true],
  ['global.info.id.channelid', true],
  ['global.info.id.lastmsgid', true],
  ['global.info.info.*', true],
  ['global.info.info.channel', true],
  ['global.info.info.role', true],
  ['global.info.info.server', true],
  ['global.info.info.user.*', true],
  ['global.info.info.user.other', true],
  ['global.info.info.user.self', true],
  ['global.info.nsfw.*', false], // To be added/renamed
  ['global.info.nsfw.info', false], // To be added/renamed
  ['global.info.ping.*', true],
  ['global.info.ping.ping', true],
  ['global.info.profile.*', false],
  ['global.info.profile.profile.*', false],
  ['global.info.profile.profile.self', false],
  ['global.info.profile.profile.other', false],
  ['global.info.quote.*', true],
  ['global.info.quote.quote', false],
  ['global.moderation.*', false],
  ['global.moderation.role.*', false], //To be renamed
  ['global.moderation.role.add', false],
  ['global.moderation.role.remove', false],
  ['global.moderation.role.setcolor', false],
  ['global.moderation.antiraid.*', false],
  ['global.moderation.antiraid.-vs', false], // 5
  ['global.moderation.antiselfstar.*', false],
  ['global.moderation.antiselfstar.antiselfstar', false],
  ['global.moderation.antispam.*', false],
  ['global.moderation.antispam.blacklist', false], // 8
  ['global.moderation.antispam.filter', false], // To be added/renamed
  ['global.moderation.bans.*', false],
  ['global.moderation.bans.ban', false],
  ['global.moderation.bans.extemojiban', false], // To be added/renamed //15
  ['global.moderation.bans.hackban', false],
  ['global.moderation.bans.reactban', false], // To be added/renamed
  ['global.moderation.bans.roleban', false], // To be added/renamed
  ['global.moderation.bans.instaban', false],
  ['global.moderation.botnick.*', false],
  ['global.moderation.botnick.change', false],
  ['global.moderation.chipsprefix.*', false],
  ['global.moderation.chipsprefix.chipsprefix', false],
  ['global.moderation.clear.*', false],
  ['global.moderation.clear.botclear', false],
  ['global.moderation.clear.clear', false], // 11
  ['global.moderation.clear.reactclear', false], // To be added/renamed
  ['global.moderation.kicks.*', false],
  ['global.moderation.kicks.kick', false],
  ['global.moderation.mutes.*', false],
  ['global.moderation.mutes.emojiban', false], // To be added/renamed
  ['global.moderation.mutes.mute', false], // To be added/renamed
  ['global.moderation.mutes.pmute', false],
  ['global.moderation.voicemoderation.*', false],
  ['global.moderation.voicemoderation.silence', false],
  ['global.moderation.voicemoderation.unsilence', false],
  ['global.moderation.voicemoderation.deafen', false],
  ['global.moderation.voicemoderation.undeafen', false],
  ['global.moderation.roles.*', false], // To be added/renamed
  ['global.moderation.roles.role.*', false], // To be added/renamed
  ['global.moderation.roles.role.add', false], // To be added/renamed
  ['global.moderation.roles.role.remove', false], // To be added/renamed
  ['global.moderation.roles.role.create', false], // To be added/renamed
  ['global.moderation.roles.role.delete', false], // To be added/renamed
  ['global.moderation.roles.role.update', false], // To be added/renamed
  ['global.moderation.setnick.*', false],
  ['global.nsfw.*', false],
  ['global.nsfw.ass.*', false],
  ['global.nsfw.ass.ass', true],
  ['global.nsfw.boobs.*', false],
  ['global.nsfw.boobs.boobs', true],
  ['global.nsfw.nsfw.*', false], // To be added/renamed
  ['global.nsfw.nsfw.info', true], // To be added/renamed
  ['global.nsfw.rule34.*', false],
  ['global.nsfw.rule34.search', true],
  ['global.utility.*', false],
  ['global.utility.calc.*', false],
  ['global.utility.calc.-calc', true],
  ['global.utility.applyforpartnership', false], // To be added/renamed
  ['global.utility.applyforpartnership.applyforpartnership', false], // To be added/renamed
  ['global.utility.applyforstaff', false],
  ['global.utility.applyforstaff.apply', true],
  ['global.utility.dictionary.*', false],
  ['global.utility.dictionary.urban', true],
  ['global.utility.emoji.*', false],
  ['global.utility.emoji.add', false],
  ['global.utility.emoji.remove', false],
  ['global.utility.mention.*', false],
  ['global.utility.mention.select', false],
  ['global.utility.nR.*', false],
  ['global.utility.nR.nR', false],
  ['global.utility.perm.*', false], // To be added/renamed
  ['global.utility.perm.perms.*', false], // To be added/renamed
  ['global.utility.perm.perms.set', false], // To be added/renamed
  ['global.utility.perm.permissionsin', true],
  ['global.utility.setchannel.*', false],
  ['global.utility.setchannel.name', false],
  ['global.utility.setchannel.topic', false],
  ['global.utility.stoptyping.*', false],
  ['global.utility.stoptyping.stoptyping', false],
  ['global.utility.translate.*', true],
  ['global.utility.translate.translate', true],
/*
  ['global.eval'              ,false], //16

  ['server.happy'             ,true ], //18
  ['server.help'              ,true ], //19
  ['global.info'              ,true ], //20
  ['global.info.all'          ,false], //21
  ['global.info.serv'         ,true ], //22
  ['global.info.channel'      ,false], //23
  ['global.info.user'         ,true ], //24
  ['global.info.user.self'    ,true ], //25
  ['server.lenny'             ,true ], //26
  ['server.mute'              ,false], //27
  ['custom.nr'                ,true ], //28
  ['global.ping'              ,true ], //29
  ['custom.points'            ,false], //30
  ['global.roll'              ,true ], //31
  ['server.s'                 ,false], //32
  ['global.stats'             ,true ], //33
  ['global.support'           ,true ], //34
  ['global.quote'             ,true ], //35

  ['global.info.role'         ,false], //36
  ['global.server.rekt'       ,true ], //37
  ['global.server.ban'        ,false], //38
  ['global.server.kick'       ,false], //39
  ['server.nsfw'              ,true ], //40
  ['global.stoptyping'        ,false], //41
  ['global.server.chipsprefix',false], //42
  ['global.server.chips.apply',true ], //43 */
];

ex.defaultperms = new Map(ex.permsList);

// These perms are active across ALL servers
ex.userpermissions = {
  // William
  '259209114268336129':
  [
    { name: ex.permsList[0][0], action: 1 },
    { name: ex.permsList[1][0], action: 1 },
    { name: ex.permsList[2][0], action: 1 },
  ],
  /*
 '205608598233939970': // Lucas
  [
    { name: ex.permsList[0][0], action: 1 },
    { name: ex.permsList[1][0], action: 1 },
    { name: ex.permsList[2][0], action: 1 },
  ],*/
  // Edp
  '250815960250974209':
  [
    { name: ex.permsList[0][0], action: 1 },
    { name: ex.permsList[1][0], action: 1 },
    { name: ex.permsList[2][0], action: 1 },
  ],
  // Hoz
  '286246724270555136':
  [
    { name: 'global.fun.*', action: 1 },
  ],
  // Chips beta
  '309504998864060416':
  [
    { name: ex.permsList[4][0], action: 1 },
  ],
  // "Harb"
  '270834390643376129':
  [
    { name: ex.permsList[4][0], action: 1 },
    { name: ex.permsList[32][0], action: 1 },
  ],
  '226769318736691201':
  [
    { name: ex.permsList[4][0], action: 1 },
  ],
  // Antonio
  '166630166825664512':
  [
    { name: 'global.fun.say.*', action: 1 },
  ],
};

ex.rolepermissions = {
  '309348424418066433':
  [
    { name: ex.permsList[3][0], action: 1 },
  ],
  260863475075514370:
  [
    { name: ex.permsList[4][0], action: 1 },
  ],
// Mute permissions:
  // Sbk Leader
  '291758886971768833':
  [
    { name: ex.permsList[27][0], action: 1 },
    { name: ex.permsList[38][0], action: 1 },
  ],
  // Sinx Admin
  '260849020291907584':
  [
    { name: ex.permsList[27][0], action: 1 },
    { name: ex.permsList[38][0], action: 1 },
  ],
  // Sbk Manager
  '302776088088674305':
  [
    { name: ex.permsList[27][0], action: 1 },
    { name: ex.permsList[38][0], action: 1 },
  ],
  // Sbk Moderator
  '260849226169319425':
  [
    { name: ex.permsList[27][0], action: 1 },
    { name: ex.permsList[38][0], action: 1 },
  ],
  // Chips
  '303732451862118410':
  [
    { name: ex.permsList[27][0], action: 1 },
  ],
};

ex.memberpermissions = {
  // SBK
  '257889450850254848':
  {
    // Willy
    '259209114268336129':
    [
      { name: ex.permsList[37][0], action: 1 },
    ],
    // Asuna
    277670245034885120:
    [
      { name: ex.permsList[24][0], action: 1 },
      { name: ex.permsList[37][0], action: 1 },
    ],
  },
};

ex.serverpermissions = {
  '302983444009451541':
  [
    { name: ex.permsList[0][0], action: -1 },
    { name: ex.permsList[1][0], action: -1 },
    { name: ex.permsList[2][0], action: -1 },
    // {name: ex.permsList[5][0], action: 1}
  ],
  '303911829778726934':
  [
    { name: ex.permsList[0][0], action: -1 },
    { name: ex.permsList[1][0], action: -1 },
    { name: ex.permsList[2][0], action: -1 },
  ],
  '257889450850254848':
  [
    { name: 'global.nsfw.*', action: -1 },
  ],
  // Diepcord
  '195278167181754369':
  [
    { name: 'global.moderation.*', action: -1 },
    { name: 'global.chipsmusic.*', action: -1 },
    { name: 'global.fun.text.3d', action: -1 },
    { name: 'global.fun.text.3d2', action: -1 },
    { name: 'global.fun.text.ascii', action: -1 },
    { name: 'global.info.nsfw.*', action: -1 },
    { name: 'global.nsfw.*', action: -1 },
  ],
};

ex.channelpermissions = {
  // Diepcord off-topic
  '195278167181754369':
  [
    { name: 'global.info.*', action: -1 },
    { name: 'global.games.*', action: -1 },
    { name: 'global.utility.*', action: -1 },
    { name: 'global.fun.*', action: -1 },
  ],
  // Diepcord diepio-chat
  '214769704932343809':
  [
    { name: 'global.info.*', action: -1 },
    { name: 'global.games.*', action: -1 },
    { name: 'global.utility.*', action: -1 },
    { name: 'global.fun.*', action: -1 },
  ],
  // Diepcord lounge
  '214925415440056322':
  [
    { name: 'global.info.*', action: -1 },
    { name: 'global.games.*', action: 1 },
    { name: 'global.utility.*', action: -1 },
    { name: 'global.fun.*', action: 1 },
  ],
  // Baka World, 373481656134270986: 419150964512129024 or general
  '419150964512129024':
  [
    { name: 'global.moderation.mutes.pmute', action: -1 },
  ],
};

ex.updatePermission = ({ type, userid = null, guildid = null, roleid = null, channelid = null, perm, action }) =>
  new Promise((resolve, reject) => {
    let checked = false;
    if (!ex.defaultperms.has(perm)) return reject('Invalid Permission');
    switch (type) {
      case 'user':
        if (!ex.userpermissions[userid]) ex.userpermissions[userid] = [];
        if (ex.userpermissions[userid].length !== 0) {
          for (const p of ex.userpermissions[userid]) {
            if (p.name === perm) {
              p.action = action;
              checked = true;
              return resolve('Updated user permissions');
            }
          }
        }
        ex.userpermissions[userid].push(
          { name: perm, action: action }
        );
        // Console.log("Created new user permission");
        checked = true;
        resolve('Created new user permission');

        if (!checked) {
          // Console.log("Could not update user perm! " );
          reject(JSON.stringify(ex.userpermissions[userid]));
        }
        break;

      case 'member':
        if (!ex.memberpermissions[guildid]) ex.memberpermissions[guildid] = {};
        if (!ex.memberpermissions[guildid][userid]) ex.memberpermissions[guildid][userid] = [];
        if (ex.memberpermissions[guildid][userid].length !== 0) {
          for (const p of ex.memberpermissions[guildid][userid]) {
            if (p.name === perm) {
              p.action = action;
              checked = true;
              return resolve('Updated member permissions');
            }
          }
        }
        ex.memberpermissions[guildid][userid].push(
          { name: perm, action: action }
        );
        // Console.log("Created new member permission");
        checked = true;
        resolve('Created new member permission');

        if (!checked) {
          // Console.log("Could not update member perm! " );
          reject(JSON.stringify(ex.memberpermissions[guildid]));
        }
        break;

      case 'role':
        if (!ex.rolepermissions[roleid]) ex.rolepermissions[roleid] = [];
        if (ex.rolepermissions[roleid].length !== 0) {
          ex.rolepermissions[roleid].forEach(p => {
            if (p.name === perm) {
              p.action = action;
              checked = true;
              resolve('Updated role permissions');
            }
          });
        }
        ex.rolepermissions[roleid].push(
          { name: perm, action: action }
        );
        // Console.log("Created new role permission for role " + roleid);
        checked = true;
        resolve('Created role perm');

        if (!checked) {
          // Console.log("Could not update role perm for role " + roleid);
          reject(JSON.stringify(ex.rolepermissions[roleid]));
        }
        break;

      case 'server':
        if (!ex.serverpermissions[guildid]) ex.serverpermissions[guildid] = [];
        if (ex.serverpermissions[guildid].length !== 0) {
          for (const p of ex.serverpermissions[guildid]) {
            if (p.name === perm) {
              p.action = action;
              checked = true;
              return resolve('Updated server permissions');
            }
          }
        }
        ex.serverpermissions[guildid].push(
          { name: perm, action: action }
        );
        // Console.log("Created new server permission");
        checked = true;
        resolve('Created server permission');

        if (!checked) {
          // Console.log("Could not update server perm! " );
          reject(JSON.stringify(ex.serverpermissions[guildid]));
        }
        break;

      case 'channel':
        if (!ex.channelpermissions[channelid]) ex.channelpermissions[channelid] = [];
        if (ex.channelpermissions[channelid].length !== 0) {
          for (const p of ex.channelpermissions[channelid]) {
            if (p.name === perm) {
              p.action = action;
              checked = true;
              return resolve('Updated channel permissions');
            }
          }
        }
        ex.channelpermissions[channelid].push(
          { name: perm, action: action }
        );
        // Console.log("Created new channel permission");
        checked = true;
        resolve('Created channel permission');

        if (!checked) {
          // Console.log("Could not update channel perm! ");
          reject(JSON.stringify(ex.channelpermissions[channelid]));
        }
        break;

      default:
        // Console.log("Unknown permission received!");
        return reject('Invalid Permissions Type');
    }
    return reject(new Error('Unknown Error occured'));
  });

ex.checkPermission = (msg, perm) => {
  // Console.log('Entering check permissions');
  return new Promise((resolve, reject) => {
    let guild = msg.guild,
      id = msg.author.id,
      cid = msg.channel.id;
    if (id === '259209114268336129') resolve(`Owner override`);
    if (guild) {
      // Console.log('Check gperms');
      let gp = ex.serverpermissions[guild.id];
      if (gp) {
        gp.forEach(pEntry =>
          pEntry.name === perm && pEntry.action === -1 ? reject('This action is disabled serverwide!') : null
        );
      }
    }
    let up = ex.userpermissions[id];
    if (up) {
      // Console.log('Check uperms');
      up.forEach(pEntry => {
        if (pEntry.name === perm) {
          // Console.log('Found a pEntry: ' +pEntry);
          if (pEntry.name.toLowerCase().startsWith('owner')) return resolve(`Bot owner perm override for ${perm}`);
          switch (pEntry.action) {
            case -1:
              reject(`I'm sorry, but you do not have access to the \`\`${perm}\`\` permission!`);
              break;
            case 1:
              resolve(`User perm overwrite for: ${perm}`);
              break;
            default:
              break;
          }
        }
      });
    }
    if (guild) {
      // Console.log('Checking mperms');
      if (ex.memberpermissions[guild.id]) {
        let mp = ex.memberpermissions[guild.id][id];
        if (mp) {
          mp.forEach(pEntry => {
            if (pEntry.name === perm) {
              switch (pEntry.action) {
                case -1:
                  reject(`I'm sorry, but you do not have access to the \`\`${perm}\`\` permission!`);
                  break;
                case 1:
                  resolve(`Member perm overwrite for: ${perm}`);
                  break;
                default:
                  break;
              }
            }
          });
        }
      }
      if (ex.channelpermissions[cid]) {
        // Console.log('Checking cperms');
        let cp = ex.channelpermissions[cid];
        if (cp) {
          cp.forEach(pEntry =>
            pEntry.name === perm && pEntry.action === -1 ?
            reject(`(Channel lock) I'm sorry, but you do not have access to the \`\`${perm}\`\` permission!`) :
            null
          );
        }
      }
      // Console.log('Checking rperms');
      msg.member.roles.forEach(r => {
        // Console.log("New role found: " + r.id + "for user "+ id);
        let rid = r.id;
        if (ex.rolepermissions[rid]) {
          let found = false;
          ex.rolepermissions[rid].forEach(pEntry => {
            // Console.log("new entry found: " + pEntry.name);
            if (!found) {
              if (pEntry.name === perm) {
                found = true;
                // Console.log("We found an entry!");
                switch (pEntry.action) {
                  case 1:
                    // Console.log("Success: role");
                    return resolve('This action is approved (by member role)');
                  case -1:
                    // Console.log("Denial: role");
                    return reject(`I'm sorry but you do not have access to ${perm} (Denied by member role :${r.name})`);
                  default:
                }
              }
            }
          });
        }
        // Console.log("Role: " + rid + "for user "+ id + "did not have any perm overwrites for " + perm);
      });
    }
    let registered = ex.defaultperms.has(perm);
    if (!registered) {
      // Console.log('Someone just tried to use a cmd with an unregistered perm '+ perm);
      return reject('Sorry, you just tried to use an unregistered command. Please report this to my developers.');
    }

    // Console.log(`Now checking the default perms.: ${perm}\nIs the perm registered list? : ${registered}`);
    let value = registered ? ex.defaultperms.get(perm) : true;
    // Console.log("The default for that perm is: " + value);
    if (!value) return resolve('This perm is denied by default.');
    return resolve('This perm is accepted by default');
    // Resolve("This command is enabled by default")
    // reject(`I'm sorry but you do not have permission \`\`${perm}\`\` to access this.`);
  });
};

ex.checkMulti = async(msg, permArr) => {
  // Console.log('[PERMISSIONS][checkMulti] Received perm check request');
  let checkDefault = false;
  for (let permEl of permArr) {
    // Console.log(`[PERMISSIONS][checkMulti] Perm element: ${permEl}`);
    let permSpecifics = permEl.split('.');
    // Console.log(`[PERMISSIONS][checkMulti] Perm breakdown: ${permSpecifics}`);
    let currentPerm = permSpecifics[0];
    if (permSpecifics.length > 1) {
      for (let i = 1; i < permSpecifics.length; i++) {
        // Console.log(`[PERMISSIONS][checkMulti] Looping through perms [${i}]:${currentPerm}`);
        let status = await ex.checkPermission(msg, `${currentPerm}.*`);
        // Console.log(`Status: ${status}`);
        if (status === 'This perm is accepted by default.') {
          checkDefault = true;
          currentPerm += `.${permSpecifics[i]}`;
          continue;
        } else if (status === 'This perm is denied by default.') {
          checkDefault = false;
          currentPerm += `.${permSpecifics[i]}`;
          continue;
        }

        return `Positive perm override for ${currentPerm}`;
      }
    }
    // Console.log(`[PERMISSIONS][checkMulti] Now checking original perm ${permEl}`);
    let status = await ex.checkPermission(msg, permEl);
    if (status === 'This perm is accepted by default.') checkDefault = true;
    else if (status === 'This perm is denied by default.') checkDefault = false;
    else return `Positive perm override for ${permEl}`;
  }
  // Console.log(`[PERMISSIONS][checkMulti] Checking default...  ${checkDefault}`);
  if (checkDefault) return `${permArr[0]} is enabled by default`;
  else throw `I'm sorry but you do not have permission \`\`${permArr[0]}\`\` to access this.`;
};

ex.rebuildDefaults = () => {
  // Enable all perms for me and edp
  let n = new Array(ex.permsList.length);
  for (let c = 0; c < ex.permsList.length; c++) {
    n.push({ name: ex.permsList[c][0], action: 1 });
  }
  ex.userpermissions[Constants.users.WILLYZ] = n;
  ex.userpermissions[Constants.users.EVILDEATHPRO] = n;
};
ex.rebuildDefaults();
module.exports = ex;
