'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGTributeWeapon } = require('./HGTributeWeapon');

const Explosive = class Explosive extends HGTributeWeapon {
  constructor (options) {
    super();
    this.options = options;
  }
};

exports.Explosive = Explosive;
