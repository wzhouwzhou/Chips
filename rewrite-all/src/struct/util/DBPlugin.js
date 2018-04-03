'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const EventEmitter = require('events');

const DBPlugin = class DBPlugin extends EventEmitter {
  constructor({ database }) {
    super();
    this.db = this.database = database;
  }
};

exports.DBPlugin = DBPlugin;
