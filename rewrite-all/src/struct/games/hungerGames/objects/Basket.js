'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGItemStorage } = require('./HGItemStorage');

const Basket = class Basket extends HGItemStorage {
  constructor (options) {
    super();
    this.options = options;
  }
};

exports.Basket = Basket;
