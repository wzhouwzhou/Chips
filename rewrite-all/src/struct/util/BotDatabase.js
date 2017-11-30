'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const GoogleSpreadsheet = require('google-spreadsheet');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const Logger = require('../client/Logger').create('Database', 'Bot');
const { Database } = require('./Database');

/**
 * BotDatabase
 * A utiliy class that represents a Discord client's database
 *
 * @extends {Database}
 * @type {BotDatabase}
 */
const BotDatabase = class BotDatabase extends Database {
  /**
   * Constructs a BotDatabase
   *
   * @constructor
   * @param {Discord.Client} client The Discord client this database belongs to.
   *
   */
  constructor(client) {
    super(client);
    this.loadGFunctions();
  }

  async load() {
    try {
      await super.load();
      this.startLog = await this.rethink.table('botStartLog').run();
      this.latestStart = this.startLog && this.startLog[0] ? this.startLog[0].status : 'Unknown';

      this.sinxUsers = new Map();
      await this.loadSBKGS();
    } catch (err) {
      this.ready = false;
      this.err = err;
      Logger.error('Database failed to load … skipping db boot');
    }
    return this;
  }

  async fetchStartLog(cache = false) {
    this.ensureRethink();
    const startLog = await this.getTable('botStartLog');
    if (cache) this.startLog = startLog;
    return startLog;
  }

  /**
   * Fetches data about the last bot start.
   *
   * @returns {Object} Object containing the last start data.
   */
  async fetchLastStart() {
    const starts = await this.fetchStartLog(false);
    return starts.reverse()[0];
  }

  /**
   * Gets the status of the last start.
   *
   * @param {boolean} cache Whether to cache the last start status.
   * @returns {string} A string containing details of last start (status)
   */
  async fetchLastStartStatus(cache = false) {
    const lastStart = await this.fetchLastStart();
    const status = lastStart.status;
    if (cache) this.latestStartStatus = status;
    return status;
  }

  /**
   * Writes start data to database.
   *
   * @returns {Promise} The status of insertion for last start.
   */
  writeLastStart() {
    let time = moment().format('ddd, Do of MMM @ HH:mm:ss.SSS');
    const status = `Shard restart on shard #${this.client.shard.id + 1}! ${time}`;
    return this.insertInTable('botStartLog', `${Date.now()}`, { status: status, data: true });
  }

  /**
   * Loads google sheet loaders
   *
   * @param {string} [lpath='./gLoaders'] Path where google loaders are stored.
   *
   * @returns {Object} Database load functions.
   */
  loadGFunctions(lpath = path.join(__dirname, './gLoaders')) {
    if (!lpath) throw new Error(`Invalid gLoader path specified of ${lpath}`);
    this.gLoaderPath = lpath;
    this.loadFunctions = {};
    for (const ploader of fs.readdirSync(this.gLoaderPath)) {
      Logger.info(`Requiring ${this.gLoaderPath}/${ploader}…`);
      const lObj = require(`${this.gLoaderPath}/${ploader}`).default;
      delete require.cache[require.resolve(`${this.gLoaderPath}/${ploader}`)];
      const loader = new lObj(this);
      this.loadFunctions[loader.loadername] = loader;
    }
    return this.loadFunctions;
  }

  loadPlugins(ppath = path.join(__dirname, './dbPlugins')) {
    if (!ppath) throw new Error(`Invalid plugin path specified of ${ppath}`);
    this.pluginPath = ppath;
    this.plugins = {};
    for (const plugin of fs.readdirSync(this.pluginPath)) {
      Logger.info(`Requiring ${this.pluginPath}/${plugin}…`);
      const P = require(`${this.pluginPath}/${plugin}`).default;
      delete require.cache[require.resolve(`${this.pluginPath}/${plugin}`)];
      const p = new P(this);
      this.plugins[p.name] = p;
    }
    return this.plugins;
  }

  emit(event, ...data) {
    super.emit(event, ...data);
    for (const pkey in this.plugins) this.plugins[pkey].emit(event, ...data);
    return this;
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
};

exports.BotDatabase = BotDatabase;
