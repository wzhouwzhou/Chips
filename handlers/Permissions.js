'use strict';
const ex = {};
ex.permsList = [
  ['global.owner'       ,false], // 0
  ['global.admin'       ,false], // 1
  ['global.test'        ,false], // 2
  ['global.test2'       ,true ], // 3
  ['global.server.-ban' ,false], // 4
  ['server.-vs '        ,true ], // 5
  ['server.aboose'      ,true ], // 6
  ['server.announce'    ,true ], // 7
  ['server.blacklist'   ,false], // 8
  ['global.botpanic'    ,false], // 9
  ['server.cat'         ,true ], //10
  ['server.clear'       ,true ], //11
  ['server.coinflip'    ,true ], //12
  ['server.dog'         ,true ], //13
  ['global.eatme'       ,true ], //14
  ['server.emojiban'    ,false], //15
  ['global.eval'        ,false], //16
  ['server.exposed'     ,true ], //17
  ['server.happy'       ,true ], //18
  ['server.help'        ,true ], //19
  ['global.info'        ,true ], //20
  ['global.info.all'    ,false], //21
  ['global.info.serv'   ,false], //22
  ['global.info.channel',false], //23
  ['global.info.user'   ,false], //24
  ['global.info.user.self',false], //25
  ['server.lenny'       ,true ], //26
  ['server.mute'        ,false], //27
  ['custom.nr'          ,true ], //28
  ['custom.ping'        ,true ], //29
  ['custom.points'      ,false], //30
  ['global.roll'        ,true ], //31
  ['server.s'           ,false], //32
  ['global.stats'       ,true ], //33
  ['global.support'     ,true ], //34
  ['global.quote'       ,true ], //35
  //future permissions add below this comment please
  ['global.info.role'   ,false], //36
  ['global.server.rekt' ,false], //37
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
      {name: ex.permsList[27][0], action: 1}
    ],
  "302776088088674305": //Sinx Manager
    [
      {name: ex.permsList[27][0], action: 1}
    ],
  "260849226169319425": //Sinx Moderator
    [
      {name: ex.permsList[27][0], action: 1}
    ],
  "291758886971768833": //Sinx Leader
    [
      {name: ex.permsList[27][0], action: 1}
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
      {name: ex.permsList[2][0], action: -1}
    ],
};

ex.updatePermission = function(id, perm, type, action){
  new Promise((response, reject) => {
    if(!ex.defaultperms.has(perm)) reject("Invalid Permission");
    switch(type){
      case "user":
      break;
      case "role":
      break;
      case "server":
      break;
      default:
      reject("Invalid Permissions Type");
      break;
    }
  });
};

ex.checkPermission = function(msg, perm){
  return new Promise((response,reject) => {
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
              response(`User perm overwrite for: ${perm}`);
              break;
            default:
              break;
          }
      });
    }
    if(guild&&ex.memberpermissions[guild.id]){
      let mp = ex.memberpermissions[guild.id][id];
      if (mp) {
        mp.forEach(pEntry=>{
          if(pEntry.name==perm)
            switch (pEntry.action){
              case -1:
                reject(`I'm sorry, but you do not have access to the \`\`${perm}\`\` permission!`);
                break;
              case 1:
                response(`Member perm overwrite for: ${perm}`);
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
                response("This action is approved (by member role)");
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
    console.log("Now checking default perms.: ." + perm);
    console.log("Is the perm in the default list? : " + ex.defaultperms.has(perm));
    let value = ex.defaultperms.has(perm)?ex.defaultperms.get(perm):true;
    console.log("The default for that perm is: " + value);
    if(value){
      response("This command is enabled by default");
    }
    else
      reject(`I'm sorry but you do not have permission \`\`${perm}\`\` to access this.`);
  });
};

ex.checkMulti = (msg, permArr) => {
  return new Promise((response, reject) =>{
      permArr.forEach(perm =>{

      });
  });
};

ex.rebuildDefaults = () =>{
  //Enable all perms for me and edp
  let n = new Array(ex.permsList.length);
  let allp = "1111111111111111111111111111111111111111111111";
  for(let c=0; c<ex.permsList.length; c++){
    n.push({name: ex.permsList[c][0], action: parseInt(allp[c])});
  }
  ex.userpermissions[Constants.users.WILLYZ]=n;
  ex.userpermissions[Constants.users.EVILDEATHPRO]=n;
};

module.exports = ex;
ex.rebuildDefaults();
