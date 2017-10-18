'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const PermissionsHandler = require('../../../../handlers/Permissions');
const GoogleSpreadsheet = require('google-spreadsheet');

const reql = require('rethinkdbdash');

const Database = class Database {
  constructor(client) {
    this.client = client;

    this.glogin = {
      client_email: process.env.SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    };
    this.gtables = {};
    this.rtables = {};
  }

  connect () {
    this.rethink = null;
    this.rethink = reql({
      servers: [
        {host: process.env.RETHINKIP, port: process.env.RETHINKPORT}
      ],
      db: 'Chips',
      user: 'admin',
      password: process.env.RETHINKPSWD,
    });
    return this;
  }

  ensureRethink () {
    if(!this.rethink) throw new Error('Rethink not connect');
  }

  async load () {
    this.ensureRethink();

    this.startLog = await this.rethink.table('botStartLog').run();
    this.latestStart = this.startLog&&this.startLog[0]?this.startLog[0]['status']:'Unknown';

    this.sinxUsers = new Map();
    this.loadPrivateGS();
    this.loadSBKGS();
  }

  loadPrivateGS () {
    this.numloads = -1;

    this.privateSheet = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
    this.sheets = {};

    doc.useServiceAccountAuth(this.glogin, () => {
      doc.getInfo((err,info) => {
        if(err) throw err;
        this.numloads = info.worksheets.length;
        for (const sheet of info.worksheets) {
          this.loadGSheet(sheet);
        }
      });
    });

  }

  loadSBKGS () {
    this.sbkPoints = new GoogleSpreadsheet('1UHXrqeaapyCXv-xJV7YmA9r5c_6tjjS9t_55YJhIFVc');

  }

  loadGSheet (gsheet) {
    this.sheets[gsheet.title] = gsheet;
    for (const preF in this.loadFunctions) {
      if(gsheet.title === preF) {
        this.loadFunctions[preF]({ sheet, client: this.client, database: this });
      }
    }
  }

  async getTable (tablename, cache = true) {
    this.ensureRethink();

    const table = await this.rethink.table(tablename).run();
    if(cache) {
      if(!this.rtables) this.rtables = {};
      this.rtables[tablename] = table;
    }
    return table;
  }

  async insertTable (tablename, id, data) {
    this.ensureRethink();

    const entry = this.rethink.table(tablename).insert(Object.assign(
      {},
      data,
      { id },
    ), { conflict: 'replace '}).run(_=>_);
    if(entry.inserted == 1 || entry.replaced == 1)
      return entry;
    throw new Error(`Data id [${id}] was not inserted: ${JSON.stringify(data)}`);
  }
};

exports.Database = Database;
