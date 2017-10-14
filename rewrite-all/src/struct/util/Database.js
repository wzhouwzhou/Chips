const PermissionsHandler = require('../../handlers/Permissions');
const GoogleSpreadsheet = require('google-spreadsheet');

const reql = require('rethinkdbdash');

const Database = class Database {
  constructor(client) {
    this.client = client;

    this.glogin = {
      client_email: process.env.SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    };
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
  }

  async load () {
    if(!this.rethink) throw new Error('Rethink not connect');

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
          this.loadsheet(sheet);
        }
      });
    });

  }

  loadSBKGS () {
    this.sbkPoints = new GoogleSpreadsheet('1UHXrqeaapyCXv-xJV7YmA9r5c_6tjjS9t_55YJhIFVc');

  }

  loadSheet (gsheet) {
    this.sheets[gsheet.title] = gsheet;
    gsheet.getRows({ offset: 1, limit: 999999});
    for (const preF in this.loadFunctions) {
      if(gsheet.title === preF) {
        this.loadFunctions[preF]({ sheet, client: this.client });
      }
    }
  }
};

exports.Database = Database;
