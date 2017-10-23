'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const moment = require('moment');
const fs = require('fs');
const { Database } = require('./Database');

const BotDatabase = class BotDatabase extends Database {
  constructor(client) {
    super(client);
    this.loadGFunctions();
  }

  async fetchLastStart () {
    const starts = await this.getTable('botStartLog');
    return starts[0];
  }

  async fetchLastStartStatus () {
    const lastStart = await this.fetchLastStart();
    return lastStart.status;
  }

  async writeLastStart () {
    let time = moment().format('ddd, Do of MMM @ HH:mm:ss');
    const status = `Shard restart on shard #${client.shard.id+1}! ${time}`.toString();
    return await this.insertInTable('botStartLog', Date.now(), status);
  }

  loadGFunctions (path = path.join(__dirname, './gLoaders')) {
    if(!path) throw new Error(`Invalid gLoader path specified of ${path}`);
    this.gLoaderPath = path;
    for(const ploader of fs.readdirSync(this.gLoaderPath)) {
      const loader = new (require(`${this.gLoaderPath}/${ploader}`).default)(this);
      delete require.cache[require.resolve(`${this.gLoaderPath}/${ploader}`)];
      this.loadFunctions[loader.loadername] = loader;
    }
  }
};

exports.BotDatabase = BotDatabase;
