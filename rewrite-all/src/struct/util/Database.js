'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('../client/Logger').create('Database', 'Main');

const PermissionsHandler = require('../../../../handlers/Permissions');
const GoogleSpreadsheet = require('google-spreadsheet');

const reql = require('rethinkdbdash');

const Database = class Database {
  /**
   * Constructs a database object
   *
   * @method constructor
   * @param  {Discord.Client}    client The bot client this database belongs to.
   */
  constructor(client) {
    this.client = client;

    this.glogin = {
      client_email: process.env.SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    };
    this.gtables = {};
    this.rtables = {};
  }

  /**
   * Connects this database to Reql
   *
   * @method connect
   * @returns {Database} Returns this database
   */
  connect() {
    this.rethink = null;
    this.rethink = reql({
      servers: [
        { host: process.env.RETHINKIP, port: process.env.RETHINKPORT },
      ],
      db: 'Chips',
      user: 'admin',
      password: process.env.RETHINKPSWD,
    });
    return this;
  }

  /**
   * Helper function to ensure that rethinkdb is initiated and usable.
   *
   * @method ensureRethink
   * @returns {Database}      this if test passed
   */
  ensureRethink() {
    if (!this.rethink) throw new Error('Rethink not connect');
    return this;
  }

  /**
   * Loads all things related to this database
   * - Namely, rethinkdb and google sheets;
   *
   * @method load
   * @returns {Promise} resolves to this
   */
  async load() {
    this.ensureRethink();

    this.startLog = await this.rethink.table('botStartLog').run();
    this.latestStart = this.startLog && this.startLog[0] ? this.startLog[0].status : 'Unknown';

    this.sinxUsers = new Map();
    await this.loadPrivateGS();
    await this.loadSBKGS();

    return this;
  }

  /**
   * Loads internal google sheets database
   *
   * @method loadPrivateGS
   * @returns {Promise}      Resolves to this
   */
  loadPrivateGS() {
    return new Promise((res, rej) => {
      this.numloads = -1;

      this.privateSheet = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
      this._sheets = {};

      this.privateSheet.useServiceAccountAuth(this.glogin, () => {
        this.privateSheet.getInfo((err, info) => {
          if (err) return rej(err);
          this.numloads = info.worksheets.length;
          for (const sheet of info.worksheets) {
            this.loadGSheet(sheet);
            --this.numloads;
          }

          return res(this);
        });
      });
    });
  }

  /**
   * Loads SBK sheets
   *
   * @method loadSBKGS
   * @returns {Promise}  Resolves to this
   */
  loadSBKGS() {
    return new Promise((res, rej) => {
      this.sbkPoints = new GoogleSpreadsheet('1UHXrqeaapyCXv-xJV7YmA9r5c_6tjjS9t_55YJhIFVc');
      this.numsbkloads = -1;

      this.sbkPoints.useServiceAccountAuth(this.glogin, () => {
        this.sbkPoints.getInfo((err, info) => {
          if (err) return rej(err);
          this.numsbkloads = info.worksheets.length;
          for (const sheet of info.worksheets) {
            this.loadGSheet(sheet);
            --this.numsbkloads;
          }
          return res(this);
        });
      });
    });
  }

  /**
   * Loads a google sheet
   *
   * @method loadGSheet
   * @param  {GoogleSpreadsheet}   gsheet The sheet to load
   * @returns {Promise}         Resolves to this._sheets
   */
  async loadGSheet(gsheet) {
    this._sheets[gsheet.title] = gsheet;
    const toLoad = [];
    for (const preF in this.loadFunctions) {
      Logger.debug(`Seeing preF: ${preF}`);
      if (gsheet.title === preF) {
        Logger.info(`Loading preF: ${preF}`);
        toLoad.push(this.loadFunctions[preF].load({
          sheet: gsheet,
          client: this.client,
          database: this,
          Permissions: PermissionsHandler,
        }));
      }
    }
    await Promise.all(toLoad);
    return this._sheets;
  }

  async getTable(tablename, cache = true) {
    this.ensureRethink();

    const table = await this.rethink.table(tablename).run();
    if (cache) {
      if (!this.rtables) this.rtables = {};
      this.rtables[tablename] = table;
    }
    return table;
  }

  async insertInTable(tablename, id = Date.now(), data = { status: false }) {
    this.ensureRethink();

    const entry = await this.rethink.table(tablename).insert(Object.assign(
      { id },
      data,
    ), {
      conflict: 'replace',
    }).run(_ => _);
    if (entry.inserted === 1 || entry.replaced === 1) return entry;
    throw new Error(`Data id [${id}] was not inserted: ${JSON.stringify(data)}`);
  }
};

exports.Database = Database;
