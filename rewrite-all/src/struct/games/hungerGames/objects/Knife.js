'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGTributeWeapon } = require('./HGTributeWeapon');

const Knife = class Knife extends HGTributeWeapon {
  constructor(options) {
    super();
    this.options = options;
  }
};

exports.Knife = Knife;
