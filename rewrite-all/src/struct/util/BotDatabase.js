'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const Logger = require('../client/Logger').create('Database', 'Bot');

const moment = require('moment');
const fs = require('fs');
const path = require('path');
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

  /**
   * Fetches data about the last bot start.
   *
   * @returns {Object} Object containing the last start data.
   */
  async fetchLastStart() {
    const starts = await this.getTable('botStartLog');
    return starts.reverse()[0];
  }


  /**
   * Gets the status of the last start.
   *
   * @returns {string} A string containing details of last start (status)
   */
  async fetchLastStartStatus() {
    const lastStart = await this.fetchLastStart();
    return lastStart.status;
  }


  /**
   * Writes start data to database.
   *
   * @returns {Promise} The status of insertion for last start.
   */
  writeLastStart() {
    let time = moment().format('ddd, Do of MMM @ HH:mm:ss');
    const status = `Shard restart on shard #${this.client.shard.id + 1}! ${time}`;
    return this.insertInTable('botStartLog', Date.now(), { status: status, data: true });
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
      const loader = new (require(`${this.gLoaderPath}/${ploader}`).default)(this);
      delete require.cache[require.resolve(`${this.gLoaderPath}/${ploader}`)];
      this.loadFunctions[loader.loadername] = loader;
    }
    return this.loadFunctions;
  }
};

exports.BotDatabase = BotDatabase;
