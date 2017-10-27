'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const { HGTributeWeapon } = require('./HGTributeWeapon');

const Arrow = class Arrow extends HGTributeWeapon {
  constructor(options) {
    super();
    this.options = options;
  }
};

exports.Arrow = Arrow;
