'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGTributeWeapon } = require('./HGTributeWeapon');

const Trident = class Trident extends HGTributeWeapon {
  constructor (options) {
    super();
    this.options = options;
  }
};

exports.Trident = Trident;
