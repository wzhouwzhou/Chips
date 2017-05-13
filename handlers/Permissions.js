const ex = {};
ex.permsList = [
  ['global.owner'    ,false],
  ['global.admin'    ,false],
  ['global.test'     ,false],
  ['global.test2'    ,true ],
  ['server.help'     ,false],
  ['server.info'     ,false],
  ['server.coinflip' ,true ],
  ['server.aboose'   ,false],
  ['server.blacklist',false],
];

ex.defaultperms = new Map(ex.permsList);

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
    ]
};

ex.rolepermissions = {
  "309348424418066433":
    [
      {name: ex.permsList[3][0], action: 1}
    ]
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
      let gid = guild.id,
        gp = ex.serverpermissions[gid];
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
    msg.member.roles.forEach(r=>{
      console.log("new role found: " + r.id);
      let rid=r.id;
      if(ex.rolepermissions[rid]==null)
        return;
      ex.rolepermissions[rid].forEach(pEntry=>{
        console.log("new entry found: " + pEntry.name);
        if(pEntry.name==perm&&pEntry.action==1){
          console.log("Success: role");
          response("This action is approved (by member role)");
        }
      });
    });
    console.log("Now checking default perms..");
    if(!ex.defaultperms.has(perm)?true:ex.defaultperms[perm])
      response("This command is enabled by default");
    else
      reject(`I'm sorry but you do not have permission \`\`${perm}\`\` to access this.`);
  });
};

module.exports = ex;
