'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { GLoader } = require('../GLoader');

exports.default = class SBKPointsLoader extends GLoader {
  constructor(db) {
    super(__filename.match(/\/([^/.]+)[^/]*$/)[1], db);
  }

  load({ database, sheet }) {
    console.log('Rawpts load called');
    return new Promise((res, rej) => {
      sheet.getRows({ offset: 1, limit: 999999 }, (err, rows) => {
        if (err) return rej(err);
        delete database.sinxUsers;
        database.sinxUsers = new Map;
        for (const row of rows) {
          if (!row.uid || !+row.rnk) {
            // Console.error('Invalid user!');
            continue;
          }
          database.sinxUsers.set(row.uid, row);
        }
        return res(database.sinxUsers);
      });
    });
  }
};
