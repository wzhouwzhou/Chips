'use strict';
const ex = {};
ex.permsList = [
  ['OWNER.owner', false], // 0
  ['global.*', false],
  ['global.custom.*', false],
  ['global.fun.*', false],
  ['global.info.*', true],
    ['global.info.discordstatus.*', true],
      ['global.info.discordstatus.discordstatus', true],
    ['global.info.help.*', true],
      ['global.info.help.help', true],
    ['global.info.info.*', true],
      ['global.info.info.user.*', true],
        ['global.info.info.user.other', true],
        ['global.info.info.user.self', true],
      ['global.info.info.server', true],
      ['global.info.info.channel', true],
    ['global.info.invite.*', true],
      ['global.info.invite.invite', true],
    ['global.info.ping.*', true],
      ['global.info.ping.ping', true],
    ['global.info.profile.*', false],
      ['global.info.profile.profile', false],
    ['global.info.quote.*', true],
      ['global.info.quote.quote', false],
    ['global.info.'],

  ['global.fun.-ban'       ,false], // 4
  ['global.moderation.antiraid.-vs'       ,false], // 5
  ['global.server.aboose'            ,true ], // 6
  ['global.server.announce'          ,true ], // 7
  ['global.server.blacklist'         ,false], // 8
  ['owner.botpanic'          ,false], // 9
  ['global.server.cat'               ,true ], //10
  ['global.server.clear'      ,false], //11
  ['global.server.coinflip'          ,true ], //12
  ['global.server.dog'               ,true ], //13
  ['global.eatme'             ,true ], //14
  ['server.emojiban'          ,false], //15
  ['global.eval'              ,false], //16
  ['server.exposed'           ,true ], //17
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
  ['global.server.chips.apply',true ], //43
];

ex.defaultperms = new Map(ex.permsList);

//these perms are active across ALL servers
ex.userpermissions = {
  "259209114268336129": //Willy
    [
      {name: ex.permsList[0][0], action: 1},
      {name: ex.permsList[1][0], action: 1},
      {name: ex.permsList[2][0], action: 1},
    ],
  "250815960250974209": //Edp
    [
      {name: ex.permsList[0][0], action: 1},
      {name: ex.permsList[1][0], action: 1},
      {name: ex.permsList[2][0], action: 1}
    ],
  "309504998864060416": //BetaBot
    [
      {name: ex.permsList[4][0], action: 1}
    ],
  "292971521159200768": //JTJosh
    [
      {name: ex.permsList[4][0], action: 1}
    ],
  "277670245034885120": //Asuna
    [
      {name: ex.permsList[4][0], action: 1}
    ],
  "270834390643376129": //Harb
    [
      {name: ex.permsList[4][0], action: 1},
      {name: ex.permsList[32][0], action: 1},
    ],
  "226769318736691201":
    [
      {name: ex.permsList[4][0], action: 1}
    ],
};

ex.rolepermissions = {
  "309348424418066433":
    [
      {name: ex.permsList[3][0], action: 1}
    ],
  "260863475075514370":
    [
      {name: ex.permsList[4][0], action: 1}
    ],
  //Mute permissions:
  "260849020291907584": //Sinx Admin
    [
      {name: ex.permsList[27][0], action: 1},
      {name: ex.permsList[38][0], action: 1},
    ],
  "302776088088674305": //Sinx Manager
    [
      {name: ex.permsList[27][0], action: 1},
      {name: ex.permsList[38][0], action: 1},
    ],
  "260849226169319425": //Sinx Moderator
    [
      {name: ex.permsList[27][0], action: 1},
      {name: ex.permsList[38][0], action: 1},
    ],
  "291758886971768833": //Sinx Leader
    [
      {name: ex.permsList[27][0], action: 1},
      {name: ex.permsList[38][0], action: 1},
    ],
  "303732451862118410": //Chips
    [
      {name: ex.permsList[27][0], action: 1}
    ],
};

ex.memberpermissions = {
  "257889450850254848": //sinx
  {
    "259209114268336129": //Willy
    [
      {name: ex.permsList[37][0], action: 1}
    ],
    "277670245034885120": //Asuna
    [
      {name: ex.permsList[24][0], action: 1},
      {name: ex.permsList[37][0], action: 1},
    ],
  }
};

ex.serverpermissions = {
  "302983444009451541":
    [
      {name: ex.permsList[0][0], action: -1},
      {name: ex.permsList[1][0], action: -1},
      {name: ex.permsList[2][0], action: -1},
      //{name: ex.permsList[5][0], action: 1}
    ],
  "303911829778726934":
    [
      {name: ex.permsList[0][0], action: -1},
      {name: ex.permsList[1][0], action: -1},
      {name: ex.permsList[2][0], action: -1},
    ],
  "257889450850254848":
    [
      {name: ex.permsList[30][0], action: -1},
    ],
};

ex.updatePermission = function({type, userid=null, guildid=null, roleid=null, perm, action}){
  return new Promise((resolve, reject) => {
    let checked = false;
    if(!ex.defaultperms.has(perm)) return reject("Invalid Permission");
    switch(type){
      case "user":
        if(ex.userpermissions[userid]==null)
          ex.userpermissions[userid] = [];
        if(ex.userpermissions[userid].length!=0){
          for(const p of ex.userpermissions[userid]){
            if(perm.toLowerCase().startsWith('owner')) resolve('Bot owner perm override for '+currentPerm);
            if(p.name==perm){
              p.action=action;
              checked = true;
              resolve("Updated user permissions");
              return;
            }
          }
        }
        ex.userpermissions[userid].push(
          {name: perm, action: action}
        );
        console.log("Created new user permission");
        checked = true;
        resolve("Created new user permission");

        if(!checked){
          console.log("Could not update user perm! " );
          reject(JSON.stringify(ex.userpermissions[userid]));
        }
      break;

      case "member":
        if(ex.memberpermissions[guildid]==null)
          ex.memberpermissions[guildid] = {};
        if(ex.memberpermissions[guildid][userid]==null)
          ex.memberpermissions[guildid][userid] = [];
        if(ex.memberpermissions[guildid][userid].length!=0){
          for(const p of ex.memberpermissions[guildid][userid]){
            if(p.name==perm){
              p.action=action;
              checked = true;
              resolve("Updated member permissions");
              return;
            }
          }
        }
        ex.memberpermissions[guildid][userid].push(
          {name: perm, action: action}
        );
        console.log("Created new member permission");
        checked = true;
        resolve("Created new member permission");

        if(!checked){
          console.log("Could not update member perm! " );
          reject(JSON.stringify(ex.memberpermissions[guildid]));
        }
      break;

      case "role":
        if(ex.rolepermissions[roleid]==null)
          ex.rolepermissions[roleid] = [];
        if(ex.rolepermissions[roleid].length!=0){
          ex.rolepermissions[roleid].forEach(p=>{
            if(p.name==perm){
              p.action=action;
              checked = true;
              resolve("Updated role permissions");
              return;
            }
          });
        }
        ex.rolepermissions[roleid].push(
          {name: perm, action: action}
        );
        console.log("Created new role permission for role " + roleid);
        checked = true;
        resolve("Created role perm");

        if(!checked){
          console.log("Could not update role perm for role " + roleid);
          reject(JSON.stringify(ex.rolepermissions[roleid]));
        }
      break;

      case "server":
        if(ex.serverpermissions[guildid]==null)
          ex.serverpermissions[guildid] = [];
        if(ex.serverpermissions[guildid].length!=0){
          for(const p of ex.serverpermissions[guildid]){
            if(p.name==perm){
              p.action=action;
              checked = true;
              resolve("Updated server permissions");
              return;
            }
          }
        }
        ex.serverpermissions[guildid].push(
          {name: perm, action: action}
        );
        console.log("Created new server permission");
        checked = true;
        resolve("Created server permission");

        if(!checked){
          console.log("Could not update server perm! " );
          reject(JSON.stringify(ex.serverpermissions[guildid]));
        }
      break;

      default:
        console.log("Unknown permission received!");
        reject("Invalid Permissions Type");
      break;
    }
  });
};

ex.checkPermission = function(msg, perm){
  return new Promise((resolve,reject) => {
    let guild = msg.guild,
      id = msg.author.id;
    if(guild){
      let gp = ex.serverpermissions[guild.id];
      if(gp!=null){
        gp.forEach(pEntry => {
          if(pEntry.name==perm&&pEntry.action==-1)
            reject("This action is disabled serverwide!");
        });
      }
    }
    let up = ex.userpermissions[id];
    if (up) {
      up.forEach(pEntry=>{
        if(pEntry.name==perm)
          switch (pEntry.action){
            case -1:
              reject(`I'm sorry, but you do not have access to the \`\`${perm}\`\` permission!`);
              break;
            case 1:
              resolve(`User perm overwrite for: ${perm}`);
              break;
            default:
              break;
          }
      });
    }
    if(guild){
      if(ex.memberpermissions[guild.id]){
        let mp = ex.memberpermissions[guild.id][id];
        if (mp) {
          mp.forEach(pEntry=>{
            if(pEntry.name==perm)
              switch (pEntry.action){
                case -1:
                  reject(`I'm sorry, but you do not have access to the \`\`${perm}\`\` permission!`);
                  break;
                case 1:
                  resolve(`Member perm overwrite for: ${perm}`);
                  break;
                default:
                  break;
              }
          });
        }
      }
      msg.member.roles.forEach(r=>{
        console.log("New role found: " + r.id + "for user "+ id);
        let rid=r.id;
        if(ex.rolepermissions[rid]!=null){
          let found = false;
          ex.rolepermissions[rid].forEach(pEntry=>{
            console.log("new entry found: " + pEntry.name);
            if(!found)
              if(pEntry.name==perm){
                found=true;
                console.log("We found an entry!");
                switch(pEntry.action){
                  case 1:
                  console.log("Success: role");
                  resolve("This action is approved (by member role)");
                  break;
                  case -1:
                  console.log("Denial: role");
                  rej(`I'm sorry but you do not have access to ${perm} (Denied by member role :${r.name})`);
                  break;
                  default:
                  return;
                }
              }
          });
        }
        console.log("Role: " + rid + "for user "+ id + "did not have any perm overwrites for " + perm);
      });
    }
    let registered = ex.defaultperms.has(perm);
    if(!registered) console.log('Someone just tried to use a cmd with an unregistered perm '+ perm);
    console.log(`Now checking default perms.: ${perm}\nIs the perm registered list? : ${registered}`);
    let value = registered?ex.defaultperms.get(perm):true;
    console.log("The default for that perm is: " + value);
    value?resolve("This command is enabled by default"):resolve("This command is enabled by default");//resolve("This command is enabled by default"):reject(`I'm sorry but you do not have permission \`\`${perm}\`\` to access this.`);
  });
};

ex.checkMulti = async (msg, permArr) => {
  console.log('[PERMISSIONS][checkMulti] Received perm check request');
  for (let permEl of permArr){
    console.log(`[PERMISSIONS][checkMulti] Perm element: ${permEl}`);
    let permSpecifics = permEl.split('.');
    console.log(`[PERMISSIONS][checkMulti] Perm breakdown: ${permSpecifics}`);
    let currentPerm = permSpecifics[0];
    if(permSpecifics.length>1)
      for(let i = 1; i<permSpecifics.length; i++){
        console.log(`[PERMISSIONS][checkMulti] Looping through perms [${i}]:${currentPerm}`);
        let status = await ex.checkPermission(msg,currentPerm+'.*');
        if(status!='This command is enabled by default')
          return ('Positive perm override for '+currentPerm);
        currentPerm+='.'+permSpecifics[i];
      }
    console.log(`[PERMISSIONS][checkMulti] Now checking original perm ${permEl}`);
    let status = await ex.checkPermission(msg,permEl);
    if(status!='This command is enabled by default')
      return ('Positive perm override for '+permEl);
  }
  console.log(`[PERMISSIONS][checkMulti] Enabled by default`);
  throw('Some commands are temporarily disabled');
};

ex.rebuildDefaults = () =>{
  //Enable all perms for me and edp
  let n = new Array(ex.permsList.length);
  let allp = "11111111111111111111111111111111111111111111111111111";
  for(let c=0; c<ex.permsList.length; c++){
    n.push({name: ex.permsList[c][0], action: parseInt(allp[c])});
  }
  ex.userpermissions[Constants.users.WILLYZ]=n;
  ex.userpermissions[Constants.users.EVILDEATHPRO]=n;
};

module.exports = ex;
ex.rebuildDefaults();
