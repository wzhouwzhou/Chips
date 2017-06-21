const perms = require('../../handlers/Permissions');
global.r = require('rethinkdbdash')({
  servers: [
    {host: process.env.RETHINKIP, port: process.env.RETHINKPORT}
  ],
  db: 'Chips',
  user: 'admin',
  password: process.env.RETHINKPSWD,
});
r.table('botStartLog').run().then( starts => {
  console.log('[DBLOADER][DB] Latest start: '+ starts[0][status]);
});

global.blacklist = {
  252525368865456130: [
      'ok',
      'xani',
      'ko',
      'ok*'
    ],
};

let sinxUsers = new Map();

const GoogleSpreadsheet = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
const sbkDoc = new GoogleSpreadsheet(`18HlGT-Ys2Z5mFTD18QZeFgnVQunf1LqT5VxnddDnbuw`);

const sheets = {};
const sbksheets = {};

let numloads = -1;
let numsbkloads = -1;

const login_info = {
  client_email:process.env.SERVICE_ACCOUNT_EMAIL,
  private_key:process.env.GOOGLE_PRIVATE_KEY,
};

const loadsheet = function(sheet, sbk) {
  if(!sbk){
    sheets[sheet.title] = sheet;
    sheet.getRows({offset: 1,limit: 999999}, (err, rows) => {
      if (sheet.title == 'submissions') {
        // load sheet data into some nice data structure and put it in `ex`
      }
      else if (sheet.title == 'members') {
        if(client.guilds.get("257889450850254848")==null) return;
        console.log("Now loading sinx members");
        rows.forEach(r => {
          //console.log("Got a row");
          if(ex.sinxUsers.get(r.userid)==null)
            ex.sinxUsers.set(r.userid,r);
          else
            ex.sinxUsers.get(r.userid).points=parseInt(ex.sinxUsers.get(r.userid).points,10)+parseInt(r.points,10);
          //console.log("new pts action");
          console.log(`Loaded user pts action for user: <@${r.userid}>, ${r.points} points, approved by: <@${r.managerid}>`);
        });
      }
      else if (sheet.title == 'quests') {
        // fdsa
      }
      else if (sheet.title == 'botlog') {
        let time = moment().format('ddd, Do of MMM @ HH:mm:ss');
        console.log("[DBLOADER][LOG] Shard restart, current time: " + time);
        const status = `Shard restart on shard #${client.shard.id+1}! ${time}`.toString();
        r.table('botStartLog').insert( {id: Date.now(), status }, {conflict: 'replace'}).run(_=>_).then(console.log);
        //sheets[`botlog`].addRow({time: `${time}`, action: "restart+load"},(err) => {if(err)console.log(err);});
      }
      else if (sheet.title == 'filter') {
        rows.forEach(row =>{
          if(client.guilds.get(row.guildid)==null){
            return console.log("[DBLOADER][FILTER] Skipped blacklist for guild "+ row.guildid);
          }else{
            if(blacklist[row.guildid]==null){
              console.log("[DBLOADER][FILTER] Creating new blacklist for guild " + row.guildid);
              blacklist[row.guildid]=['ok'];
            }
            blacklist[row.guildid].push(row.keyword);
            console.log("[DBLOADER][FILTER] Added keyword to guild " + row.guildid + ": " + row.keyword);
          }
        });
      }
      else if (sheet.title == "permissions"){
        rows.forEach(row => {
          if((row.guildid!=null&&row.guildid!='')&&(client.guilds.get(row.guildid)==null)){
            return console.log("[DBLOADER][PERMISSIONS] Skipped permissions entry for guild "+ row.guildid);
          }else{
            let type = row.type;
            let userid = row.userid.toString();
            let guildid = row.guildid.toString();
            let roleid = row.roleid.toString();
            let perm = row.perm.toString();
            let action = parseInt(row.action);
            perms.updatePermission( {type: type, userid: userid, guildid: guildid, roleid: roleid, perm: perm, action: action} )
            .then(info=>console.log(`[DBLOADER][PERMISSIONS]: ${info}`))
            .catch(err=>{
              console.log(`[DBLOADER][PERMISSIONS][ERR] Caught: ${err}`);
            });
          }
        });
      }else if (sheet.title == "prefixes"){
        rows.forEach(row => {
          let oldprefix = (!customprefix[row.guildid])?'none':customprefix[row.guildid];
          customprefix[row.guildid] = row.prefix;
          console.log(`[DBLOADER][PREFIXES] Custom prefix for guild ${[row.guildid]} updated! [Old]: ${oldprefix} [New]: ${customprefix[row.guildid]}`);
        });
      }else {
        console.log('[DBLOADER] Extra sheet found: '+sheet.title);
      }
      numloads--;
      if (numloads == 0) {
        console.log('Database loaded!');
        ex.ready = true;
      }
    });
  }else{
    sbksheets[sheet.title] = sheet;
    sheet.getRows({offset: 1,limit: 999999}, (err, rows) => {
      if (sheet.title == 'rawpts') {
        rows.forEach(row => {
          console.log('[DBLOADER][SBKLOADER][Points Loader] Found: ' + row['uid']);

        });
      }

      numsbkloads--;
      if (numsbkloads == 0) {
        console.log('SBK database loaded!');
        ex.sbkready = true;
      }
    });
  }
};

doc.useServiceAccountAuth(login_info,() => {
  doc.getInfo((err,info) => {
    numloads = info.worksheets.length;
    for (var i=0;i<info.worksheets.length;i++) {
      loadsheet(info.worksheets[i],false);
    }
  });
});

sbkDoc.useServiceAccountAuth(login_info,() => {
  sbkDoc.getInfo((err,info) => {
    numloads = info.worksheets.length;
    for (var i=0;i<info.worksheets.length;i++) {
      loadsheet(info.worksheets[i],true);
    }
  });
});

const getSinxPt = (id) => {
  return new Promise( (resolve) =>{
    sbkDoc.useServiceAccountAuth(login_info,() => {
      sbkDoc.getInfo((err,info) => {
        numloads = info.worksheets.length;
        for (var i=0;i<info.worksheets.length;i++) {
          let sheet = info.worksheets[i];
          sheet.getRows({offset: 1,limit: 999999}, (err, rows) => {
            if (sheet.title == 'rawpts') {
              rows.forEach(row=>{
                if(row.uid==id)
                  resolve(row.pts);
              });
            }
          });
        }
      });
    });
    resolve(0);
  });
};

//how to insert with rethinkdb: r.db('rethinkdb').table('tablename').insert({some obj stuff},{conflict: 'replace'})

const ex = module.exports = { // module exports
  ready: false,
  sbkready: false,
  sheets: sheets,
  sbksheets: sbksheets,
  sinxUsers: sinxUsers,
  getSinxPt: getSinxPt,
};
