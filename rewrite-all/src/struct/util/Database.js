'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const GoogleSpreadsheet = require('google-spreadsheet');
const reql = require('rethinkdbdash');

const Logger = require('../client/Logger').create('Database', 'Main');
const PermissionsHandler = require('../../../../handlers/Permissions');

const EventEmitter = require('events');
/**
 * Database
 * A utiliy class that represents a generic Database that uses both Google spreadsheet and Reql storage.
 * @abstract
 * @class
 * @type {GLoader}
 */
const Database = class Database extends EventEmitter {
  /**
   * Constructs a database object
   *
   * @constructor
   * @param  {Discord.Client}    client The bot client this database belongs to.
   */
  constructor(client) {
    super();

    /**
     * The client this database belongs to.
     * @member
     * @type {Discord.Client}
     */
    this.client = client;

    /**
    * The google login credentials
    * @member
    * @type {Object}
    */
    this.glogin = {
      client_email: process.env.SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    };

    /**
    * The google spreadsheets of this database, empty on instantiation.
    * @type {Object}
    */
    this.gtables = {};

    /**
    * The reql database of this object, null on instantiation.
    * @type {Object}
    */
    this.rethink = null;

    /**
    * The reql tables of this database, empty on instantiation.
    * @type {Object}
    */
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
    this.rtables = {};
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
   * @async
   * @method load
   * @async
   * @returns {Promise} resolves to this
   */
  async load() {
    this.ensureRethink();

    await this.loadPrivateGS();

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
   * Loads a google sheet
   *
   * @method loadGSheet
   * @param  {GoogleSpreadsheet}   gsheet The sheet to load
   * @async
   * @returns {Promise}         Resolves to this._sheets
   */
  async loadGSheet(gsheet) {
    this._sheets[gsheet.title] = gsheet;
    const toLoad = [];
    for (const preF in this.loadFunctions) {
      // Logger.debug(`Seeing preF: ${preF}`);
      if (gsheet.title === preF) {
        Logger.info(`Loading preF: ${preF}`);
        toLoad.push(this.loadFunctions[preF].load({
          sheet: gsheet,
          client: this.client,
          database: this,
          Permissions: PermissionsHandler,
        }));
        break;
      }
    }
    await Promise.all(toLoad);
    return this._sheets;
  }

  /**
   * Gets a reql table.
   *
   * @param {string}  tablename    The name of the table to fetch
   * @param {boolean} [cache=true] Whether to internally cache the table contents into this.rtables
   * @async
   * @returns {Promise.<Array>} Table entries, where keys are ids.
   */
  async getTable(tablename, cache = true) {
    this.ensureRethink();

    const table = await this.rethink.table(tablename).run();
    if (cache) {
      if (!this.rtables) this.rtables = {};
      this.rtables[tablename] = table;
    }
    return table;
  }
  /**
   * Same of getTable except array is sorted by id (in ascending order)
   *
   * @param {string}  tablename    The name of the table to fetch
   * @param {boolean} [cache=true] Whether to internally cache the table contents into this.rtables
   * @async
   * @returns {Promise.<Array>} Table entries, where keys are ids.
   */

  async getTableIDSorted(tablename, cache = true) {
    this.ensureRethink();

    const table = (await this.rethink.table(tablename).run()).sort((a, b) => b.id - a.id);
    if (cache) {
      if (!this.rtables) this.rtables = {};
      this.rtables[tablename] = table;
    }
    return table;
  }

  /**
   * Inserts data into a table.
   *
   * @param {string}    tablename    The name of the table to insert data into.
   * @param {string} [id=Date.now()] The id of data to insert
   * @param {Object}  [data={}]      Data to insert
   * @async
   * @returns {Object} Status of insertion.
   * @throws {Error}   If data wasn't inserted then it will attempt to be stringified in the error.
   */
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

  async removeFromTable(tablename, id) {
    const result = await (new Promise)((res, rej) => {
      this.rethink
        .table(tablename)
        .get(id)
        .delete({ returnChanges: !0 })
        .run((e, data) => {
          if (e) return rej(e);
          return res(data);
        });
    });
    return result;
  }
};

/**
 * Export Database class
 * @module Database
 */
exports.Database = Database;
