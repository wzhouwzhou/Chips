'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { GLoader } = require('../GLoader');

exports.default = class PermisionsLoader extends GLoader {
  constructor(db) {
    super(__filename.match(/\/([^/.]+)[^/]*$/)[1], db);
  }

  load({ sheet, Permissions }) {
    console.log('Permissions load called');
    return new Promise((res, rej) => {
      sheet.getRows({ offset: 1, limit: 999999 }, (err, rows) => {
        if (err) return rej(err);
        for (const row of rows) {
          if ((row.guildid != null && row.guildid != '') && (client.guilds.get(row.guildid) == null)) { continue; } else {
            let type = row.type;
            let userid = row.userid.toString();
            let guildid = row.guildid.toString();
            let roleid = row.roleid.toString();
            let perm = row.perm.toString();
            let action = parseInt(row.action);
            if (type === 'role') console.log(`[Permissions][Loader] Roleid ${roleid} for guild ${guildid}: ${action} for ${perm}`);
            Permissions.updatePermission({ type: type, userid: userid, guildid: guildid, roleid: roleid, perm: perm, action: action })
              .catch(rej);
          }
        }
        return res(true);
      });
    });
  }
};
