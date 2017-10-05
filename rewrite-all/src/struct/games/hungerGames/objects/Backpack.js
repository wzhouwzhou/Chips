'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGItemStorage } = require('./HGItemStorage');

const Backpack = class Backpack extends HGItemStorage {
  constructor (options) {
    super();
    this.options = options;
  }
};

exports.Backpack = Backpack;
