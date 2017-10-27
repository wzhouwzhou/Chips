'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGTributeWeapon } = require('./HGTributeWeapon');

const { Arrow } = require('./Arrow');

const Bow = class Bow extends HGTributeWeapon {
  constructor(options) {
    super();
    this.options = options;
  }
};

exports.Bow = Bow;
