'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { GLoader } = require('../GLoader');

exports.default = class CPrefixLoader extends GLoader {
  constructor(db) {
    super(__filename.match(/\/([^/.]+)[^/]*$/)[1], db);
  }

  load({ client, sheet }) {
    console.log('Prefix load called');
    return new Promise((res, rej) => {
      sheet.getRows({ offset: 1, limit: 999999 }, (err, rows) => {
        if (err) return rej(err);
        delete client.customprefix;
        client.customprefix = {};
        for (const row of rows) {
          if (!row.guildid) {
            console.error('No guildid specified!');
            continue;
          }
          client.customprefix[row.guildid] = row.prefix;
        }
        return res(client.customprefix);
      });
    });
  }
};
