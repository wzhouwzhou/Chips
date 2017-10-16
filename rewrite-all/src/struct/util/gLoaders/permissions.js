'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { GLoader } = require('./GLoader');

exports.func = class PermisionsLoader extends GLoader {
  constructor (db) {
    super((__filename).match(/\/([^/.]+)[^/]*$/), db);
  }

  load ({ sheet, Permissions }) {
    return new Promise ((res, rej) => {
      sheet.getRows({ offset: 1, limit: 999999}, (err, rows) => {
        if (err) return rej(err);
        rows.forEach(row => {
          if ((row.guildid!=null&&row.guildid!='')&&(client.guilds.get(row.guildid)==null))
            return;
          else {
            let type = row.type;
            let userid = row.userid.toString();
            let guildid = row.guildid.toString();
            let roleid = row.roleid.toString();
            let perm = row.perm.toString();
            let action = parseInt(row.action);
            Permissions.updatePermission({ type: type, userid: userid, guildid: guildid, roleid: roleid, perm: perm, action: action })
            .then(res)
            .catch(rej);
          }
        });
      });
    });
  }
};
