'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const ensureAbstract = require('../../deps/functions/ensureAbstractF').default();
const Discord = require('Discord');

const HGItemStorage = class HGItemStorage extends Discord.Collection {
  constructor (items) {
    super(items);
    ensureAbstract(this, HGItemStorage);
  }
};

exports.HGItemStorage = HGItemStorage;
